# @depack/bundle

%NPM: @depack/bundle%

`@depack/bundle` is The Source Code For The Bundle Logic To Prepare Temp Files. Because Google Closure Compiler cannot import _JSX_ files, we create a temp directory to put them in there, and also allow to update `preact` to `@externs/preact` in the temp as well, so that _Preact_ can be referenced separately from the compiled code.

```sh
yarn add @depack/bundle
```

## Table Of Contents

%TOC%

%~%