const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig');

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '..',
    testEnvironment: 'node',
    // testRegex: '.(e2e-spec.ts|spec.ts)$',
    testMatch: ['<rootDir>/test/*.spec.ts'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
        },
    },
    modulePathIgnorePatterns: ['<rootDir>/src/app_modules'],
};
