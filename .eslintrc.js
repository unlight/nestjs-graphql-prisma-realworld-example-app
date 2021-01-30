module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        'plugin:sonarjs/recommended',
        'plugin:jest/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'unicorn',
        'import',
        'wix-editor',
        'prettier',
        'simple-import-sort',
        'promise',
        'sonarjs',
        'jest',
        'boundaries',
        'only-warn',
    ],
    ignorePatterns: ['@generated/**', '*.config.js', '.*rc.js'],

    settings: {
        'import/resolver': {
            typescript: {},
            node: {},
        },
        'boundaries/ignore': [
            '**/*.spec.ts',
            '**/testing/**',
            '**/@generated/**',
            'src/main.ts',
        ],
        'boundaries/elements': [
            {
                type: 'common',
                pattern: 'src/app.environment.ts',
                mode: 'full',
            },
            {
                type: 'common',
                pattern: 'app_modules/*',
                mode: 'folder',
            },
            {
                type: 'common',
                pattern: 'src/prisma/*',
                mode: 'file',
                capture: ['elementName'],
            },
            {
                type: 'module',
                pattern: '**/*/*.module.ts',
                mode: 'file',
                capture: ['base', 'feature', 'elementName'],
            },
            {
                type: 'resolver',
                pattern: 'src/*/**/*.resolver.ts',
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
            {
                type: 'controller',
                pattern: 'src/*/**/*.controller.ts',
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
            {
                type: 'service',
                pattern: 'src/*/**/*.service.ts',
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
            {
                type: 'repository',
                pattern: 'src/*/**/*.repository.ts',
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
            {
                type: 'guard',
                pattern: 'src/*/**/*.guard.ts',
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
            {
                type: 'interceptor',
                pattern: 'src/*/**/*.interceptor.ts',
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
            {
                type: 'validator',
                pattern: 'src/*/**/*.validator.ts',
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
            {
                type: 'model',
                pattern: [
                    '**/*/models/*.{input,output,args,model,dto}.ts',
                    '*/*/*.{input,output,args,model,dto}.ts',
                ],
                mode: 'file',
                capture: ['base', 'feature', 'elementName'],
            },
            {
                type: 'type',
                pattern: '**/*/types',
                mode: 'folder',
                capture: ['base', 'feature'],
            },
            {
                type: 'file',
                pattern: ['src/*/**/*.ts', 'src/*/**/fragments/*'],
                mode: 'file',
                capture: ['feature', 'path', 'elementName'],
            },
        ],
    },
    rules: {
        // core
        'no-unused-vars': 0,
        'no-undef': 0,
        'consistent-return': [1, { treatUndefinedAsUnspecified: true }],
        quotes: [1, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
        semi: [1, 'always'],
        'max-lines': [1, { max: 300 }],
        'max-params': [1, { max: 5 }],
        'no-unneeded-ternary': [1],
        // wix-editor
        'wix-editor/no-instanceof-array': 1,
        'wix-editor/no-not-not': 1,
        'wix-editor/no-unneeded-match': 1,
        'wix-editor/prefer-filter': 1,
        'wix-editor/prefer-ternary': 1,
        'wix-editor/return-boolean': 1,
        'wix-editor/simplify-boolean-expression': 1,
        // unicorn
        'unicorn/prefer-spread': 0,
        'unicorn/catch-error-name': 0,
        'unicorn/prevent-abbreviations': [
            1,
            {
                replacements: {
                    err: false,
                    prod: false,
                    ref: false,
                    params: false,
                    args: false,
                },
            },
        ],
        // import
        'import/newline-after-import': 0,
        'import/no-duplicates': 1,
        'import/max-dependencies': [1, { max: 15 }],
        // simple-import-sort with recomended settings
        'simple-import-sort/imports': 1,
        'simple-import-sort/exports': 1,
        'sort-imports': 0,
        'import/first': 1,
        'import/newline-after-import': 1,
        'import/no-duplicates': 1,
        'prettier/prettier': [1, { endOfLine: 'auto' }],
        // typescript-eslint
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-floating-promises': 1,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        // boundaries
        'boundaries/no-unknown-files': 1,
        'boundaries/no-private': [1, { allowUncles: true }],
        'boundaries/element-types': [
            1,
            {
                default: 'disallow',
                rules: [
                    {
                        from: ['type'],
                        allow: '*',
                    },
                    {
                        from: ['common'],
                        allow: ['common', 'type'],
                    },
                    {
                        from: ['file'],
                        allow: ['type', ['file', { feature: '${feature}' }]],
                    },
                    {
                        from: 'module',
                        allow: [
                            'module',
                            'type',
                            'common',
                            ['controller', { feature: '${feature}' }],
                            ['resolver', { feature: '${feature}' }],
                            ['service', { feature: '${feature}' }],
                            ['interceptor', { feature: '${feature}' }],
                            ['repository', { feature: '${feature}' }],
                            ['validator', { feature: '${feature}' }],
                            ['model', { feature: '${feature}' }],
                            ['file', { feature: '${feature}' }],
                        ],
                    },
                    {
                        from: [
                            'controller',
                            'resolver',
                            'guard',
                            'interceptor',
                            'service',
                            'repository',
                            'validator',
                        ],
                        allow: [
                            'common',
                            'type',
                            ['service', { feature: '${feature}' }],
                            ['model'],
                        ],
                    },
                    {
                        from: 'service',
                        allow: [
                            'service',
                            'type',
                            ['repository', { feature: '${feature}' }],
                            ['file', { feature: '${feature}' }],
                        ],
                    },
                    {
                        from: ['controller', 'resolver'],
                        allow: [
                            'common',
                            'type',
                            'service',
                            ['guard', { feature: '${feature}' }],
                            ['interceptor', { feature: '${feature}' }],
                        ],
                    },
                    {
                        from: ['model'],
                        allow: [
                            'common',
                            'type',
                            ['validator', { feature: '${feature}' }],
                        ],
                    },
                ],
            },
        ],
        'boundaries/entry-point': [
            0,
            {
                default: 'allow',
                rules: [
                    {
                        target: ['type'],
                        disallow: ['*'],
                        allow: 'index.ts',
                    },
                ],
            },
        ],
    },
    overrides: [
        {
            files: ['*.spec.ts', '**/testing/**/*.ts', '*.e2e-spec.ts'],
            rules: {
                'unicorn/consistent-function-scoping': 0,
                'unicorn/prevent-abbreviations': 0,
                'unicorn/no-null': 0,
                'consistent-return': 0,
                'max-lines': 0,
                '@typescript-eslint/no-explicit-any': 0,
                '@typescript-eslint/no-floating-promises': 0,
                '@typescript-eslint/no-non-null-assertion': 0,
                '@typescript-eslint/camelcase': 0,
                'import/max-dependencies': 0,
                'sonarjs/no-duplicate-string': 0,
            },
        },
    ],
};
