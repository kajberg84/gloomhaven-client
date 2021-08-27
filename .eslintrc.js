module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "amd": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        //allowing prop children types
        "react/prop-types": "off",
        //turns of unused variables
        "no-unused-vars": "off",
            // suppress errors for missing 'import React' in files
   "react/react-in-jsx-scope": "off",
    }
};
