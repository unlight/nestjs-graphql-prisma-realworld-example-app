const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    rootDir: 'src',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverage: false,
    coverageDirectory: `${__dirname}/coverage`,
    coverageReporters: ['lcov', 'text'],
    collectCoverageFrom: [
        '**/*.ts',
        '!**/*.spec.ts',
        '!**/*.module.ts',
        '!**/@generated/**',
    ],
    testRegex: ['(\\.|/)(test|spec)\\.[jt]sx?$'],
    // testMatch: ['<rootDir>/src/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    // modulePathIgnorePatterns: ['<rootDir>/dist'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../',
    }),
    // modulePathIgnorePatterns: ['<rootDir>/app_modules'],
    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
        },
    },
};
