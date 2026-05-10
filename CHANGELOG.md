# Change Log

All notable changes to the "nspin-esm" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2026-05-10

### Added

- Added full TypeScript declaration support for published packages.
- Added modern ESM-compatible package exports.
- Added ATTW (`@arethetypeswrong/cli`) validation pipeline.
- Added Vite 8 build pipeline.
- Added `vite-plugin-dts` declaration generation.
- Added pnpm-based dependency management.
- Added modern GitHub Actions CI workflow.
- Added Dependabot automated dependency updates.
- Added package integrity verification during CI.
- Added Node.js 22+ engine enforcement.

### Changed

- Migrated package management from npm to pnpm.
- Migrated bundling pipeline to Vite 8.
- Simplified build architecture by removing legacy Rollup plugins.
- Simplified ESM build output structure.
- Replaced legacy `.mjs` output with modern ESM `.js` output.
- Improved package exports compatibility for Node.js and bundlers.
- Improved TypeScript compatibility for consumers.
- Improved package validation workflow.
- Improved Vitest test coverage and environment handling.
- Improved tarball packaging and distribution structure.
- Improved CI reproducibility using frozen lockfiles.
- Improved Biome configuration and file inclusion rules.

### Removed

- Removed unnecessary Rollup plugin dependencies.
- Removed legacy compression pipeline.
- Removed SWC-based transformation layer.
- Removed unnecessary source map publication artifacts.
- Removed unused peer dependency declarations.
- Removed unnecessary Vite aliases and SSR configuration.

## [1.1.0] - 2025-03-27

### Changed

- Improve documentation for clarity and ease of use.
- Improve type imports to clean up the code and make it more readable.

## [1.0.0] - 2025-03-26

### Added

- Initial release of the npm package.

[Unreleased]: https://github.com/ManuelGil/nspin-esm/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/ManuelGil/nspin-esm/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ManuelGil/nspin-esm/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/nspin-esm/releases/tag/v1.0.0
