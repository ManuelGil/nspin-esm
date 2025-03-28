# nspin-esm

[![NPM Version](https://img.shields.io/npm/v/nspin-esm?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin-esm)
[![NPM Downloads](https://img.shields.io/npm/dt/nspin-esm?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin-esm)

## Overview

**nspin-esm** is a lightweight, efficient Node.js spinner package built entirely with native features for optimal performance. As an **ESM-only** package designed for modern Node.js (v22+), it provides a simple, intuitive, and dependency-free API to create and manage spinner animations in your applications.

![nspin-esm](https://raw.githubusercontent.com/ManuelGil/nspin-esm/main/assets/nspin-esm.gif)

## Requirements

- **Node.js 22+**: Access modern APIs such as `styleText` and `performance.now()`.
- Exclusively ESM: Enjoy modern module resolution and a cleaner development experience.

## Key Features

- **Lightweight & Efficient**: Leverages native Node.js features to minimize overhead.
- **ESM-Only**: Optimized for modern ECMAScript module usage.
- **Zero Dependencies**: No external libraries—ensuring fast, secure, and minimal installations.
- **Chainable API**: Methods like `start`, `updateText`, `updateFrames`, and `stop` return the spinner instance for fluent usage.
- **Dynamic Frame Updates**: Change spinner animation frames on the fly.
- **Adaptive Output**: Automatically adjusts for both TTY and non-TTY environments.
- **Position Configuration**: Option to position the spinner to the left (default) or right of the text.
- **Robust Error Handling**: Designed to degrade gracefully in non-TTY environments and handle runtime nuances.

## Installation

Install **nspin-esm** via npm:

```bash
npm install nspin-esm
```

## Quick Usage

Below is a basic example demonstrating how to initialize a spinner, update its message dynamically, and stop it after a task is complete.

```typescript
import { Spinner } from "nspin-esm";

// Define spinner frames (simple rotation)
const simpleRotation = ["|", "/", "-", "\\"];

// Start the spinner with an initial message
const spinner = new Spinner({
  frames: simpleRotation,
  interval: 100
}).start("Loading...");

// Stop the spinner after 3 seconds with a final message
setTimeout(() => {
  spinner.stop("Done!");
}, 3000);
```

## API Overview

- **`new Spinner(options)`**
  Create a new spinner instance with options:
  - `frames`: Array of spinner frames (e.g., `["|", "/", "-", "\\"]`).
  - `interval`: Delay between frames in milliseconds (default: 80).
  - `format`: Styling options via `styleText`.
  - `position`: Placement relative to text (`'left'` or `'right'`).

- **Instance Methods**:
  - `start(text?: string)`: Begins the spinner with an optional message.
  - `updateText(newText: string)`: Updates the spinner’s displayed message.
  - `updateFrames(newFrames: string[])`: Dynamically changes the spinner frames.
  - `stop(finalText?: string)`: Stops the spinner and shows a final message.

## Additional Information

- **Performance & Modernity**:
  Built exclusively as an ESM package, **nspin-esm** takes full advantage of Node.js v22+ features to ensure a high-performance, modern development experience.

- **Error Handling & Compatibility**:
  The package is designed to gracefully handle non-TTY environments, ensuring that output remains clear and useful even when advanced terminal features are unavailable.

- **Clean & Modular Design**:
  Following SOLID principles, the library is modular and easy to extend, making it an excellent choice for projects that need maintainable and scalable code.

## Documentation & Support

For detailed documentation—including comprehensive usage examples, advanced API reference, and contribution guidelines—please visit the [GitHub repository](https://github.com/ManuelGil/nspin-esm).

If you encounter any issues or have suggestions, please [open an issue](https://github.com/ManuelGil/nspin-esm/issues) on GitHub.

---

*This README for npm is a simplified version. For the complete documentation and all available examples, please refer to the full README on GitHub.*
