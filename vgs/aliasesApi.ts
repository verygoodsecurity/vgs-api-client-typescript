import { AliasesApi } from '../api/aliasesApi';
import { CreateAliasesRequestNew } from '../model/createAliasesRequestNew';
import { AliasFormat } from '../model/aliasFormat';
import { RevealedData } from '../model/revealedData';
import { CreateAliasesRequest } from '../model/createAliasesRequest';
import { UpdateAliasRequest } from '../model/updateAliasRequest';
import { UpdateAliasRequestData } from '../model/updateAliasRequestData';
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

export class ApiError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function config(username: string, password: string, host = 'https://api.sandbox.verygoodvault.com') {
  return new Configuration(username, password, host);
}

export class Aliases {
  private readonly _api;

  constructor(conf: Configuration) {
    this._api = new AliasesApi(conf.username, conf.password, conf.host);
    this._api.defaultHeaders = { 'User-Agent': 'vgs-api-client/XXX.YYY.ZZZ/typescript' };
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
    return this._api.createAliases(request).then((response) => response.body!.data!).catch(() => {
      throw new ApiError(`Failed to redact data ${data}`);
    });
  }

  public async reveal(aliases) {
    // TODO: validate input
    const query = Array.isArray(aliases) ? aliases.join(',') : aliases;

    return this._api.revealMultipleAliases(query).then(
      (response) => response.body!.data!,
    ).catch(() => {
      throw new ApiError(`Failed to reveal aliases ${aliases}`);
    });
  }

  public async update(alias, data) {
    const updateRequest = new UpdateAliasRequest();
    updateRequest.data = new UpdateAliasRequestData();
    updateRequest.data.classifiers = data.classifiers;
    return this._api.updateAlias(alias, updateRequest).catch(() => {
      throw new ApiError(`Failed to update alias ${alias}`);
    });
  }

  public async delete(alias) {
    return this._api.deleteAlias(alias).catch(() => {
      throw new ApiError(`Failed to delete alias ${alias}`);
    });
  }
}
