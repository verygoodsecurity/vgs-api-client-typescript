export * from './aliasesApi';
import { AliasesApi } from './aliasesApi';
export * from './defaultApi';
import { DefaultApi } from './defaultApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [AliasesApi, DefaultApi];
