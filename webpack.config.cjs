/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');
module.exports = {
	entry: './src/main.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css'],
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		historyApiFallback: true,
		// port: 8080,
		open: true,
	},
	performance: {
		hints: false,
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new CleanWebpackPlugin({
			dry: true,
			verbose: true,
			cleanStaleWebpackAssets: false,
			// cleanOnceBeforeBuildPatterns: ['**/*.js', '**/*.css', '!index.html'],
			// cleanAfterEveryBuildPatterns: ['**/*.js', '**/*.css']
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeScriptTypeAttributes: true,
				removeAttributeQuotes: false,
				useShortDoctype: true,
				minifyJS: true,
				minifyCSS: true,
			},
		}),
		new PurgeCSSPlugin({
			paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
		}),
	],
};