## API

The package is available by importing its default function:

```js
import generateTemp from '@depack/bundle'
```

%~%

```## async generateTemp
[
  ["entry", "string"],
  ["config?", "TempConfig"]
]
```

Generates a temp directory for the given entry file and transpiles JSX files that are references in it.

%TYPEDEF types/index.xml%

<!-- %EXAMPLE: example/example, ../src => @depack/bundle%
%FORK example/example% -->

%~%