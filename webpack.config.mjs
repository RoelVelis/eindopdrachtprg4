import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/main.ts',
    devtool: 'source-map',
    devServer: {
        port: 9000,
        allowedHosts: 'all',
        devMiddleware: {
            writeToDisk: true
        },
        static: {
            directory: path.resolve(__dirname)
        }
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                "index.html"
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|bmp|wav|mp3)$/,
                type: 'asset/resource'
            }
        ]
    }
};
