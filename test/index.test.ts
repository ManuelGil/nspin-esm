import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Spinner } from '../src/index.js';

describe('Spinner - TTY Environment', () => {
  let originalIsTTY: boolean | undefined;

  let moveCursorSpy: ReturnType<typeof vi.spyOn> | undefined;

  let cursorToSpy: ReturnType<typeof vi.spyOn> | undefined;

  let writeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Simulate TTY environment
    originalIsTTY = process.stdout.isTTY;

    process.stdout.isTTY = true;

    // Spy on cursor methods only if available
    if (typeof process.stdout.moveCursor === 'function') {
      moveCursorSpy = vi
        .spyOn(process.stdout, 'moveCursor')
        .mockImplementation(() => true) as unknown as ReturnType<
        typeof vi.spyOn
      >;
    }

    if (typeof process.stdout.cursorTo === 'function') {
      cursorToSpy = vi
        .spyOn(process.stdout, 'cursorTo')
        .mockImplementation(() => true) as unknown as ReturnType<
        typeof vi.spyOn
      >;
    }

    // Capture stdout writes
    writeSpy = vi
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true) as unknown as ReturnType<typeof vi.spyOn>;
  });

  afterEach(() => {
    process.stdout.isTTY = originalIsTTY ?? false;

    moveCursorSpy?.mockRestore();

    cursorToSpy?.mockRestore();

    writeSpy.mockRestore();
  });

  it('should support method chaining and spinner lifecycle', () => {
    const spinner = new Spinner({
      frames: ['-', '\\', '|', '/'],
      interval: 10,
      format: 'cyan',
    });

    const result = spinner
      .start('TTY Test')
      .updateText('Updated')
      .stop('Final TTY');

    expect(result).toBeInstanceOf(Spinner);

    expect(writeSpy).toHaveBeenCalled();

    if (moveCursorSpy) {
      expect(moveCursorSpy).toHaveBeenCalled();
    }

    if (cursorToSpy) {
      expect(cursorToSpy).toHaveBeenCalled();
    }
  });

  it('should update spinner frames dynamically', () => {
    const spinner = new Spinner({
      frames: ['-', '+'],
      interval: 10,
    });

    spinner.updateFrames(['◐', '◓', '◑', '◒']);

    expect(spinner).toBeInstanceOf(Spinner);
  });

  it('should stop gracefully with final text', () => {
    const spinner = new Spinner({
      frames: ['-', '\\'],
      interval: 10,
    });

    spinner.start('Loading');

    spinner.stop('Done');

    const calls = writeSpy.mock.calls.flat();

    const output = calls.join('');

    expect(output).toContain('Done');
  });
});

describe('Spinner - Non-TTY Environment', () => {
  let originalIsTTY: boolean | undefined;

  let originalMoveCursor: typeof process.stdout.moveCursor | undefined;

  let originalCursorTo: typeof process.stdout.cursorTo | undefined;

  let writeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Simulate non-TTY environment
    originalIsTTY = process.stdout.isTTY;

    process.stdout.isTTY = false;

    // Remove cursor manipulation methods
    originalMoveCursor = process.stdout.moveCursor;

    originalCursorTo = process.stdout.cursorTo;

    (
      process.stdout as unknown as {
        moveCursor: typeof process.stdout.moveCursor | undefined;
      }
    ).moveCursor = undefined;

    (
      process.stdout as unknown as {
        cursorTo: typeof process.stdout.cursorTo | undefined;
      }
    ).cursorTo = undefined;

    // Spy on stdout writes
    writeSpy = vi
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true) as unknown as ReturnType<typeof vi.spyOn>;
  });

  afterEach(() => {
    process.stdout.isTTY = originalIsTTY ?? false;

    if (originalMoveCursor) {
      process.stdout.moveCursor = originalMoveCursor;
    }

    if (originalCursorTo) {
      process.stdout.cursorTo = originalCursorTo;
    }

    writeSpy.mockRestore();
  });

  it('should render output with newline in non-TTY environments', async () => {
    const spinner = new Spinner({
      frames: ['-', '\\', '|', '/'],
      interval: 10,
      format: 'green',
    });

    spinner.start('Non-TTY Test');

    // Wait for at least one render cycle
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    spinner.stop('Final Non-TTY');

    const calls = writeSpy.mock.calls;

    const finalCall = calls[calls.length - 1]?.[0] as string;

    expect(finalCall).toContain('\n');

    expect(finalCall).toContain('Final Non-TTY');
  });

  it('should not throw when cursor methods are unavailable', () => {
    const spinner = new Spinner({
      frames: ['-', '\\'],
      interval: 10,
    });

    expect(() => {
      spinner.start('No Cursor Support');

      spinner.stop('Done');
    }).not.toThrow();
  });
});
