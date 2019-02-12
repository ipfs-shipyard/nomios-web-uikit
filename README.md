# idm-web-uikit

IDM's living web ui kit.

## Base technology

- React
- CSS modules
- [PostCSS](https://github.com/postcss/postcss) with [MOXY's preset](https://github.com/moxystudio/postcss-preset-moxy)
- SVG spriting support with [external-svg-sprite-loader](https://github.com/karify/external-svg-sprite-loader)


## Commands

### start

```sh
$ npm run storybook
```

Starts [Storybook](https://storybook.js.org/).

### build

```sh
$ npm run build
```

Builds the project.

NOTE: at the current stage of the package, the build script has not yet been defined. It will be defined in the near future.

### lint

```sh
$ npm run lint
```

Checks if the project has any linting errors.

### release

```sh
$ npm run release
```

Releases and publishes the package. Runs tests, lints and builds the project beforehand.

This command uses [`standard-version`](https://github.com/conventional-changelog/standard-version) underneath. The version is automatically inferred from the [conventional commits](https://conventionalcommits.org/).

NOTE: this package still does not have a release script, as it is still in the initial stages of its development. This script will be added in the near future.


## Contributing

If you want to contribute for the project, we encourage you to read over the [IDM](https://github.com/ipfs-shipyard/pm-idm) repository README.
