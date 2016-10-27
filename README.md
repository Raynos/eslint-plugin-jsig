# eslint-plugin-jsig

A plugin that runs the [`jsig`][jsig] type checker as part of eslint.
Works with eslint text editor plugins and the CLI.

# Example

```json
{
    "rules": {
        "jsig/type-check": 2
    },
    "plugins": [
        "jsig"
    ]
}
```

To use this plugin you must have [`jsig`][jsig] installed as a peer dependency.
The `eslint-plugin-jsig` module only works with `jsig@>=0.2.6`.

It's recommended that you configure your application with a `jsigconfig.json`
file so that the eslint plugin can pick up your configuration.

## Installation

`npm install eslint-plugin-jsig`

## Tests

`npm test`

## Contributors

 - raynos

## MIT Licensed

  [jsig]: https://github.com/Raynos/jsig
  [build-png]: https://secure.travis-ci.org/raynos/eslint-plugin-jsig.png
  [build]: https://travis-ci.org/raynos/eslint-plugin-jsig
  [cover-png]: https://coveralls.io/repos/raynos/eslint-plugin-jsig/badge.png
  [cover]: https://coveralls.io/r/raynos/eslint-plugin-jsig
  [dep-png]: https://david-dm.org/raynos/eslint-plugin-jsig.png
  [dep]: https://david-dm.org/raynos/eslint-plugin-jsig
  [npm-png]: https://nodei.co/npm/eslint-plugin-jsig.png?stars&downloads
  [npm]: https://nodei.co/npm/eslint-plugin-jsig
