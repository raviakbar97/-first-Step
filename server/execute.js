const { VM } = require('vm2');

/**
 * Execute JavaScript code in a sandboxed environment
 * @param {string} code - JavaScript code to execute
 * @returns {object} - Execution result with output and error
 */
function runJS(code) {
  const output = [];
  let error = null;

  // Create custom console that captures output
  const customConsole = {
    log: (...args) => {
      const message = args
        .map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(' ');
      output.push(message);
    },
    error: (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      output.push(`[ERROR] ${message}`);
    },
    warn: (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      output.push(`[WARN] ${message}`);
    },
    info: (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      output.push(`[INFO] ${message}`);
    },
  };

  try {
    // Create sandbox
    const sandbox = {
      console: customConsole,
      setTimeout: () => {}, // Disable for safety
      setInterval: () => {}, // Disable for safety
      fetch: undefined, // Disable for safety
      XMLHttpRequest: undefined, // Disable for safety
      require: undefined, // Disable for safety
      process: undefined, // Disable for safety
    };

    // Create VM with timeout
    const vm = new VM({
      timeout: 5000, // 5 seconds max execution time
      sandbox,
    });

    // Execute code
    vm.run(code);
  } catch (err) {
    error = err.message;
  }

  return {
    output,
    error,
  };
}

module.exports = {
  runJS,
};
