> :warning: InterUnit is currently undergoing active development towards v1. As a result, the library may undergo changes without considering backwards compatibility. Please exercise discretion while using it until the stable v1 release.

![InterUnit Logo](https://github.com/interunit/ui/assets/29106675/9a79cc13-10ca-4e03-abf8-b82930a48c24)

# InterUnit

> Effortless cross-platform development with React and React Native

Our open-source library revolutionizes cross-platform development by offering a unified solution for creating components in both React and React Native. With our versatile and easy-to-use universal React primitives, developers can seamlessly build and deploy components across different platforms, streamlining the development process and empowering them to craft immersive experiences effortlessly.

# Documentation

Full documentation is being written and will soon exist at [interunit.dev](https://interunit.dev).

# Contributing

InterUnit welcomes contributions from anyone willing to help! A roadmap will soon be available for those interested in contributing to the future development of InterUnit.

This repository is a monorepo that leverages yarn and turbo repo, simplifying cross-platform and multi-packaage development. We utilize [preconstruct](https://preconstruct.tools/) to instantly update changes from the `packages` directory across projects in the `apps` directory. Here are a few steps to get started:

**Installation**

```
yarn
```

**Run docs website**

```
cd apps/interunit-dot-dev && yarn dev
```

**Run example app**

```
cd apps/interunit-example-app && yarn dev
```

**Create a new package**

```
yarn create:package
```

**Resume package compilation**

```
yarn preconstruct:dev
```

**Build packages for production bundling**

```
yarn preconstruct:build
```

# Authors

- Kyle McDonald - [@kylemcd](https://github.com/kylemcd)
