import "mock-local-storage";

Object.defineProperty(global, "window", {
  value: {} as Window & typeof globalThis
});

Object.defineProperty(window, "localStorage", {
  value: global.localStorage
});
