import { AliasesApi } from '../api/aliasesApi';
import { CreateAliasesRequestNew } from '../model/createAliasesRequestNew';
import { AliasFormat } from '../model/aliasFormat';
import { RevealedData } from '../model/revealedData';
import { CreateAliasesRequest } from '../model/createAliasesRequest';
import { UpdateAliasRequest } from '../model/updateAliasRequest';
import { UpdateAliasRequestData } from '../model/updateAliasRequestData';
import { HttpError } from '../api/apis';
import StorageEnum = RevealedData.StorageEnum;

export class Configuration {
  private readonly _username: string;

  private readonly _password: string;

  private readonly _host: string;

  constructor(username: string, password: string, host: string) {
    this._username = username;
    this._password = password;
    this._host = host;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get host(): string {
    return this._host;
  }
}

export class VgsApiError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, VgsApiError.prototype);
  }
}

export class UnauthorizedError extends VgsApiError {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class NotFoundError extends VgsApiError {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ForbiddenError extends VgsApiError {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export function config(username: string, password: string, host = 'https://api.sandbox.verygoodvault.com') {
  return new Configuration(username, password, host);
}

export class Aliases {
  private readonly _api;

  constructor(configuration: Configuration) {
    if (!configuration) {
      throw new Error('configuration must be provided');
    }
    this._api = new AliasesApi(configuration.username, configuration.password, configuration.host);
    this._api.defaultHeaders = { 'User-Agent': 'vgs-api-client/XXX.YYY.ZZZ/typescript' };
  }

  private static mapException(message, error) {
    let errorMessage = message;
    let vgsApiError = new VgsApiError(errorMessage);
    if (error instanceof HttpError) {
      errorMessage += `. Details: ${error.message}`;
      switch (error.statusCode) { // eslint-disable-line default-case
        case 401:
          vgsApiError = new UnauthorizedError(errorMessage);
          break;
        case 403:
          vgsApiError = new ForbiddenError(errorMessage);
          break;
        case 404:
          vgsApiError = new NotFoundError(errorMessage);
          break;
      }
    }
    return vgsApiError;
  }

  public async redact(data) {
    // TODO: validate input
    const createAliasRequests = data.map((item) => {
      const req = new CreateAliasesRequestNew();
      req.classifiers = Array.isArray(item.classifiers) ? item.classifiers : [];
      req.format = item.format ? item.format : AliasFormat.UUID;
      req.value = item.value;
      req.storage = item.storage ? item.storage : StorageEnum.PERSISTENT;
      return req;
    });
    const request = new CreateAliasesRequest();
    request.data = createAliasRequests;
    return this._api.createAliases(request).then((response) => response.body!.data!).catch((e) => {
      throw Aliases.mapException(`Failed to redact data ${JSON.stringify(data, null, 2)}`, e);
    });
  }

  public async reveal(aliases) {
    // TODO: validate input
    const query = Array.isArray(aliases) ? aliases.join(',') : aliases;

    return this._api.revealMultipleAliases(query).then(
      (response) => response.body!.data!,
    ).catch((e) => {
      throw Aliases.mapException(`Failed to reveal aliases ${JSON.stringify(aliases, null, 2)}`, e);
    });
  }

  public async update(alias, data) {
    const updateRequest = new UpdateAliasRequest();
    updateRequest.data = new UpdateAliasRequestData();
    updateRequest.data.classifiers = data.classifiers;
    return this._api.updateAlias(alias, 'PERSISTENT', updateRequest).catch((e) => {
      throw Aliases.mapException(`Failed to update alias ${JSON.stringify(alias, null, 2)}`, e);
    });
  }

  public async delete(alias) {
    return this._api.deleteAlias(alias).catch((e) => {
      throw Aliases.mapException(`Failed to delete alias ${JSON.stringify(alias, null, 2)}`, e);
    });
  }
}
