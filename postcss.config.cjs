/* eslint-disable no-undef */
module.exports = {
	plugins: [

		require('autoprefixer'), // Adds vendor prefixes to CSS rules
		require('postcss-preset-env'), // Polyfills CSS features using stage 4 proposals
		require('cssnano') // Minifies CSS
	]
};
