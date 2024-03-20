/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		historyApiFallback: true,
		port: 3000,
		open: true,
	},
	performance: {
		hints: false,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
		}),
	],
};