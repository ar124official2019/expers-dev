// babel.config.js
module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        // "minify",
        "@babel/preset-typescript",
    ],

    ignore: [
        "**/*.spec.ts",
        "./src/requirements.spec",
    ]
};