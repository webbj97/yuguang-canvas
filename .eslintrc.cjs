module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "standard-with-typescript",
        "standard",
    ],
    overrides: [],
    parser: "typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: "@typescript-eslint/parser",
        // project: ["./tsconfig.json"],
        // extraFileExtensions: [".vue"],
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        semi: ["error", "always"],
    },
};

// module.exports = {
//     env: {
//         browser: true,
//         es2021: true,
//     },
//     extends: [
//         "plugin:vue/vue3-essential",
//         "plugin:@typescript-eslint/recommended",
//         "standard",
//     ],
//     overrides: [],
//     parser: "vue-eslint-parser",
//     parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         parser: "@typescript-eslint/parser",
//     },
//     plugins: ["vue", "@typescript-eslint"],
//     rules: {
//         semi: ["error", "always"],
//     },
// };
