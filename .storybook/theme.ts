import { create } from '@storybook/theming';

const theme = create({
	base: 'dark',

	// Typography
	fontBase: '"EB Garamond", serif',
	// fontCode: 'monospace',

	brandTitle: '@sveltejs-labs/Leaflet',
	brandUrl: 'https://www.npmjs.com/package/@sveltejs-labs/chart.js',
	// brandImage: '/logo.png',
	brandTarget: '_blank',

	// Color
	colorPrimary: '#eb5027',
	colorSecondary: '#f07959'

	// // UI
	// appBg: '#ffffff',
	// appContentBg: '#ffffff',
	// appPreviewBg: '#ffffff',
	// appBorderColor: '#585C6D',
	// appBorderRadius: 4,
	//
	// // Text colors
	// textColor: '#10162F',
	// textInverseColor: '#ffffff',
	//
	// // Toolbar default and active colors
	// barTextColor: '#9E9E9E',
	// barSelectedColor: '#585C6D',
	// barHoverColor: '#585C6D',
	// barBg: '#ffffff',
	//
	// // Form colors
	// inputBg: '#ffffff',
	// inputBorder: '#10162F',
	// inputTextColor: '#10162F',
	// inputBorderRadius: 2
});

export default theme;
