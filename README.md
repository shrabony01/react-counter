# Lab 1: React Counter with useEffect

An advanced React counter application built with TypeScript, exploring multi-state management,side effects with the useEffect hook, and lifecycle cleanup functions.

---

## Features

- **Core Counter Controls**: Increment and decrement count values using a customizable step amount.
- **Dynamic Step Configuration**: Input field allowing users to define custom step intervals (defaults to 1).
- **History Tracking**: Automatically records and displays the sequence of all previous counts.
- **Debounced Auto-Save**: Saves count and history to `localStorage` automatically using a `useEffect` hook. Includes a cleanup function (`clearTimeout`) to prevent race conditions during rapid state updates.
- **Keyboard Shortcuts**: Document-level event listeners bound inside `useEffect` that listen for `ArrowUp` (increment) and `ArrowDown` (decrement), with proper cleanup on unmount and input-field isolation.
- **Full Reset**: Resets the current count back to 0 and clears the history log.

## Implementation Details

- **State Management**: Uses `useState` to track `count`, custom `step` intervals, `history` logs, and `saveStatus`.
- **Keyboard Shortcuts**: Adds a `window` keydown listener via `useEffect` with `[count, step]` dependencies to avoid stale closures, and includes input checks to prevent unwanted triggers during typing.
- **Auto-Save & Cleanup**: Saves values to `localStorage` after a 400ms debounce. Unmounts and state updates trigger `clearTimeout` to prevent race conditions.
- **Event Cleanup**: Removes the window keydown listener using `removeEventListener` on unmount to prevent duplicate bindings and memory leaks.

