# Contributing

- `docs/spec.md` is authoritative. Change the spec first, then the schema and validator, then the tests.
- `npm test` and `npm run lint` must pass. CI runs both on Node 20 and 22.
- Fixtures in `test/fixtures/*.json5` double as documentation images. After an intended render change run `npm run update-snapshots` and `npm run docs`, and commit the changed SVGs.
- Every fenced `json5 drumdrom` block in the docs is tested. Use `json5 drumdrom-invalid` with a `// expect: E_CODE` comment for examples that must fail.
- Style: CommonJS with `'use strict'`, snake_case keys, kebab-case file names, camelCase functions. Keep comments sparse. Do not use em dashes in comments or docs.
- Versioning follows Semantic Versioning 2.0.0. Record changes in `CHANGELOG.md`.
