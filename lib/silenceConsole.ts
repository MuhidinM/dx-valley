// silenceConsole.js
if (process.env.NODE_ENV === "production") {
  // Override console methods to suppress logs
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
