const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = (options = {}) => {
    const tsConfigFile = path.resolve(__dirname, 'tsconfig.json');
    const main = path.resolve(__dirname, 'src/main.ts');
    const hotEntry = 'webpack/hot/poll?1000';

    return {
        entry: main,
        target: 'node',
        devtool: 'source-map',
        mode: 'none',
        output: {
            filename: 'main.js',
            hotUpdateChunkFilename: '.hot/[id].[fullhash:6].hot-update.js',
            hotUpdateMainFilename: '.hot/[fullhash:6].hot-update.json',
        },
        externals: [
            nodeExternals({
                allowlist: [hotEntry],
            }),
        ],
        optimization: {
            moduleIds: 'named',
            nodeEnv: false,
        },
        node: {
            __filename: false,
            __dirname: false,
        },
        module: {
            rules: [
                {
                    test: /.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                configFile: tsConfigFile,
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: tsConfigFile,
                }),
            ],
        },
        plugins: [
            (() => {
                const {
                    default: NodeHotLoaderWebpackPlugin,
                } = require('node-hot-loader/NodeHotLoaderWebpackPlugin');
                return new NodeHotLoaderWebpackPlugin({
                    fork: false,
                    args: [],
                    autoRestart: true,
                });
            })(),
        ],
        stats: {
            version: false,
            children: false,
            modulesSpace: 0,
        },
    };
};
