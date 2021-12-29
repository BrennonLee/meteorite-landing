module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        // '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app',
        // '@storybook/addon-knobs',
        'storybook-addon-material-ui',
    ],
    webpackFinal: (config) => {
        return {
            ...config,
            plugins: config.plugins.filter((plugin) => {
                // Remove the eslint-webpack-plugin: We already check our code, storybook doesn't need to bother
                return !(
                    plugin.options &&
                    plugin.options.formatter &&
                    typeof plugin.options.formatter === 'string' &&
                    plugin.options.formatter.includes('eslint')
                );
            }),
        };
    },
};
