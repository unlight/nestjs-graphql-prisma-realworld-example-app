import { Inject, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { IncomingMessage } from 'http';

export const RequestIdToken = Symbol('RequestId');

const defaultProviderOptions = {
    headerName: 'X-Request-Id',
    createId: createId,
    getRequest: tryGetRequest,
};

type CreateProviderOptions = Partial<typeof defaultProviderOptions>;

export function requestIdProvider(options: CreateProviderOptions = {}): Provider {
    const { createId, getRequest, headerName } = {
        ...defaultProviderOptions,
        ...options,
    };
    return {
        provide: RequestIdToken,
        useFactory: context => {
            const request = getRequest?.(context);
            let result = request.headers[headerName];
            if (!result) {
                result = createId();
                request.headers[headerName] = result;
                request.res?.append(headerName, result);
            }
            return result;
        },
        inject: [REQUEST],
        scope: Scope.REQUEST,
    };
}

export function RequestId() {
    return Inject(RequestIdToken);
}

function createId() {
    return Date.now().toString(36).slice(-6).toUpperCase();
}

function tryGetRequest(context: unknown): Request {
    if (context instanceof IncomingMessage) {
        return context as Request;
    }
    if ((<any>context)?.req instanceof IncomingMessage) {
        return (<any>context).req;
    }
    throw new Error('Provide get request factory function');
}
