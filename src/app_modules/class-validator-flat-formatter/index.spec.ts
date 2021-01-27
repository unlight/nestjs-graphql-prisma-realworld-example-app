import { ValidationError } from '@nestjs/common';
import { stripIndents } from 'common-tags';

import { classValidatorFlatFormatter } from '.';

describe('classValidatorFlatFormatter', () => {
    it('single error object', () => {
        const error: ValidationError = {
            value: 'aa@mai1l1',
            property: 'email',
            children: [],
            constraints: {
                isEmail: 'email must be an email',
            } as Record<string, string>,
        };
        expect(classValidatorFlatFormatter([error])).toEqual(stripIndents`
        email: email must be an email (isEmail).
        `);
    });

    it('several errors with single constraint', () => {
        const errors: Partial<ValidationError>[] = [
            {
                value: '',
                property: 'name',
                children: [],
                constraints: {
                    minLength: 'name must be longer than or equal to 3 characters',
                },
            },
            {
                value: '',
                property: 'password',
                children: [],
                constraints: {
                    isNotEmpty: 'password should not be empty',
                },
            },
        ];
        expect(classValidatorFlatFormatter(errors as ValidationError[]))
            .toEqual(stripIndents`
        name: name must be longer than or equal to 3 characters (minLength),
        password: password should not be empty (isNotEmpty).
        `);
    });

    it('single error with multiple constraints', () => {
        const errors: Partial<ValidationError>[] = [
            {
                value: '',
                property: 'name',
                children: [],
                constraints: {
                    minLength: 'minLength error message',
                    isNotEmpty: 'name should not be empty',
                },
            },
        ];
        expect(classValidatorFlatFormatter(errors as ValidationError[]))
            .toEqual(stripIndents`
            name: minLength error message (minLength),
            name: name should not be empty (isNotEmpty).
        `);
    });

    it('single with nested', () => {
        const errors: Partial<ValidationError>[] = [
            {
                property: 'user',
                children: [
                    ({
                        property: 'name',
                        constraints: { alnum: 'alnum error' },
                    } as unknown) as ValidationError,
                ],
                constraints: {
                    isNotEmpty: 'should not be empty',
                },
            },
        ];
        expect(classValidatorFlatFormatter(errors as ValidationError[]))
            .toEqual(stripIndents`
            user: should not be empty (isNotEmpty),
            user.name: alnum error (alnum).
        `);
    });

    it('fault tollerance', () => {
        const errors: Partial<ValidationError>[] = [{}];
        expect(classValidatorFlatFormatter(errors as ValidationError[])).toEqual('');
        expect(classValidatorFlatFormatter(undefined as any)).toEqual('');
        expect(classValidatorFlatFormatter(null as any)).toEqual('');
    });
});
