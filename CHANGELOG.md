## 14 September 2019

### [1.4.1](https://github.com/dpck/bundle/compare/v1.4.0...v1.4.1)

- [deps] Update _static-analysis_ for multiple entries detection.
- [feature] Process all `node_modules` at once.

### [1.4.0](https://github.com/dpck/bundle/compare/v1.3.1...v1.4.0)

- [feature] Handle linked packages.
- [fix] Replace the final `index.js` and `.js` with an empty string.

## 12 September 2019

### [1.3.1](https://github.com/dpck/bundle/compare/v1.3.0...v1.3.1)

- [doc] Update _README_.

### [1.3.0](https://github.com/dpck/bundle/compare/v1.2.0...v1.3.0)

- [feature] Process anonymous _JS/JSX_ imports.

## 17 August 2019

### [1.2.0](https://github.com/dpck/bundle/compare/v1.1.1...v1.2.0)

- [feature] Generate JavaScript from CSS files calling `depack/inject-css`.

## 13 May 2019

### [1.1.1](https://github.com/dpck/bundle/compare/v1.1.0...v1.1.1)

- [fix] Use fullwidth `＠` because _GCC_ thinks that `@externs` in JSDoc is an indication of the file being an externs file.

### [1.1.0](https://github.com/dpck/bundle/compare/v1.0.5...v1.1.0)

- [fix] Disable path expansions for packages (they will be analysed with static-analysis).
- [feature] Allow to use `@externs/preact` by renaming `preact` import for external preact.
- [externs] Add externs to the project.

## 18 April 2019

### [1.0.5](https://github.com/dpck/bundle/compare/v1.0.4...v1.0.5)

- [fix] Process packages with paths, e.g., `preact/src/preact`.

## 4 April 2019

### [1.0.4](https://github.com/dpck/bundle/compare/v1.0.3...v1.0.4)

- [deps] Unfix dependencies.

## 2 April 2019

### [1.0.3](https://github.com/dpck/bundle/compare/v1.0.2...v1.0.3)

- [deps] Update dependencies.

## 2 March 2019

### 1.0.2

- [deps] Update dependencies, including `@a-la/jsx`.

## 8 February 2019

### 1.0.1

- [package] Add build.

### 1.0.0

- Create `@depack/bundle` with _[My New Package](https://mnpjs.org)_
- [repository]: `src`, `test`
