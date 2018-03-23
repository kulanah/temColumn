module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true,
    },
    "globals":{
        "userColumn": true,
        "render": true,
        "scene": true,
        "Column": true,
        "SimpleLens": true,
        "AngledLens": true,
        "THREE": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};