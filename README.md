> :warning: InterUnit is currently undergoing active development towards v1. As a result, the library may undergo changes without considering backwards compatibility. Please exercise discretion while using it until the stable v1 release.

![InterUnit Logo](https://github.com/interunit/ui/assets/29106675/9a79cc13-10ca-4e03-abf8-b82930a48c24)

<p align="center">
    <img src="https://github.com/interunit/ui/actions/workflows/unit-testing.yml/badge.svg?event=push" alt="Tests Passing"/>
    <a href="https://codecov.io/gh/interunit/ui">
        <img src="https://codecov.io/gh/interunit/ui/graph/badge.svg?token=UCDJAO7E2C" alt="Codcov Test Coverage"/>
    </a>
</p>

# InterUnit

> Effortless cross-platform development with React and React Native

Our open-source library revolutionizes cross-platform development by offering a unified solution for creating components in both React and React Native. With our versatile and easy-to-use universal React primitives, developers can seamlessly build and deploy components across different platforms, streamlining the development process and empowering them to craft immersive experiences effortlessly.

# Documentation

Full documentation is being written and will soon exist at [interunit.dev](https://interunit.dev).

# Contributing

InterUnit welcomes contributions from anyone willing to help! A roadmap will soon be available for those interested in contributing to the future development of InterUnit.

This repository is a monorepo that leverages bun and turborepo, simplifying cross-platform and multi-package development. We utilize [tsup](https://tsup.egoist.dev/) to instantly update changes from the `packages` directory across projects in the `apps` directory. Here are a few steps to get started:

**Installation**

```
bun install
```

**Develop docs site**

```
bun run dev:docs
```

**Develop packages**

```
bun run watch:package
```

**Create a new package**

```
bun run create:package
```

**Build packages for publish**

```
bun run build:package
```

**Publish package**

```
bun run changeset:add
bun run changeset:version
bun run changeset:publish (may need --otp)
```

# Authors

- Kyle McDonald - [@kylemcd](https://github.com/kylemcd)
