<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

# expense-tracker-local

=======

>>>>>>> Stashed changes
=======
<<<<<<< HEAD
# expense-tracker-local
=======
>>>>>>> c6173b1 (Resolve merge conflicts)
=======
# expense-tracker-local
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
<<<<<<< HEAD
<<<<<<< HEAD
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
=======
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
<<<<<<< HEAD
>>>>>>> c6173b1 (Resolve merge conflicts)
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
<<<<<<< HEAD
<<<<<<< HEAD
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
=======
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
<<<<<<< HEAD
>>>>>>> c6173b1 (Resolve merge conflicts)
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
<<<<<<< HEAD
<<<<<<< HEAD
    ...react.configs["jsx-runtime"].rules,
  },
});
```
<<<<<<< Updated upstream
=======

> > > > > > > 7664af9 (Dexie Init Commit)

# expense-tracker-local
>>>>>>> Stashed changes
=======
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
    ...react.configs['jsx-runtime'].rules,
  },
})
```
>>>>>>> 7664af9 (Dexie Init Commit)
<<<<<<< HEAD
>>>>>>> c6173b1 (Resolve merge conflicts)
=======
>>>>>>> c6173b12bdcfb5d199f99596b0e189c5d8fbd6ee
