module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'vuetify',
        // 'prettier'
    ],
    plugins: [
        // 'prettier'
    ],
    rules: {
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        // 'prettier/prettier': ['error'],
        'no-console': [1, {
            allow: ['warn', 'error'],
        }],
        'no-debugger': 1,
        'no-warning-comments': [1, {
            'terms': ['hardcoded'], location: 'anywhere',
        }],
        'no-tabs': 2,
        'max-len': [1, {
            'code': 80,
            'comments': 80,
            'ignoreUrls': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
            'ignoreRegExpLiterals': true,
        }],
        'vue/max-attributes-per-line': [1, {
            'singleline': 2,
            'multiline': {
                'max': 1,
                'allowFirstLine': false,
            },
        }],
        'comma-dangle': [1, 'always-multiline'],
        'linebreak-style': ['error', 'unix'],
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
}
