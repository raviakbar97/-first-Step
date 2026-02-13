// Initialize CodeMirror editors
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
  mode: 'xml',
  theme: 'dracula',
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  tabSize: 2,
  indentUnit: 2,
  lineWrapping: true,
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
  mode: 'css',
  theme: 'dracula',
  lineNumbers: true,
  autoCloseBrackets: true,
  tabSize: 2,
  indentUnit: 2,
  lineWrapping: true,
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
  mode: 'javascript',
  theme: 'dracula',
  lineNumbers: true,
  autoCloseBrackets: true,
  tabSize: 2,
  indentUnit: 2,
  lineWrapping: true,
});

// Track active editor
let activeEditor = htmlEditor;

// Tab switching
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');

    // Get language
    const lang = tab.dataset.lang;

    // Show/hide editors
    if (lang === 'html') {
      htmlEditor.getWrapperElement().style.display = 'block';
      cssEditor.getWrapperElement().style.display = 'none';
      jsEditor.getWrapperElement().style.display = 'none';
      activeEditor = htmlEditor;
    } else if (lang === 'css') {
      htmlEditor.getWrapperElement().style.display = 'none';
      cssEditor.getWrapperElement().style.display = 'block';
      jsEditor.getWrapperElement().style.display = 'none';
      activeEditor = cssEditor;
    } else if (lang === 'js') {
      htmlEditor.getWrapperElement().style.display = 'none';
      cssEditor.getWrapperElement().style.display = 'none';
      jsEditor.getWrapperElement().style.display = 'block';
      activeEditor = jsEditor;
    }

    // Refresh editor
    activeEditor.refresh();
  });
});

// Initialize display
htmlEditor.getWrapperElement().style.display = 'block';
cssEditor.getWrapperElement().style.display = 'none';
jsEditor.getWrapperElement().style.display = 'none';

// Refresh editors on resize
window.addEventListener('resize', () => {
  htmlEditor.refresh();
  cssEditor.refresh();
  jsEditor.refresh();
});

// Preview iframe
const previewFrame = document.getElementById('preview-frame');

// Console output
const consoleOutput = document.getElementById('console-output');

function addConsoleLine(message, type = 'log') {
  const line = document.createElement('div');
  line.className = `console-line console-${type}`;

  const timestamp = new Date().toLocaleTimeString();
  line.textContent = `[${timestamp}] ${message}`;

  consoleOutput.appendChild(line);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
  consoleOutput.innerHTML = '<div class="console-line console-info">> Console cleared</div>';
}

// Update preview
function updatePreview() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  // Create complete document
  const doc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>
                // Override console to capture output
                (function() {
                    const originalConsole = window.console;
                    window.console = {
                        log: function(...args) {
                            window.parent.postMessage({
                                type: 'console',
                                method: 'log',
                                args: args.map(arg => {
                                    if (typeof arg === 'object') {
                                        try {
                                            return JSON.stringify(arg);
                                        } catch (e) {
                                            return String(arg);
                                        }
                                    }
                                    return String(arg);
                                })
                            }, '*');
                            originalConsole.log(...args);
                        },
                        error: function(...args) {
                            window.parent.postMessage({
                                type: 'console',
                                method: 'error',
                                args: args.map(arg => String(arg))
                            }, '*');
                            originalConsole.error(...args);
                        },
                        warn: function(...args) {
                            window.parent.postMessage({
                                type: 'console',
                                method: 'warn',
                                args: args.map(arg => String(arg))
                            }, '*');
                            originalConsole.warn(...args);
                        }
                    };

                    // Send ready signal
                    window.parent.postMessage({ type: 'ready' }, '*');
                })();

                // User code
                try {
                    ${js}
                } catch (error) {
                    window.parent.postMessage({
                        type: 'console',
                        method: 'error',
                        args: [error.message]
                    }, '*');
                }
            </' + 'script>
        </body>
        </html>
    `;

  // Write to iframe
  previewFrame.srcdoc = doc;
}

// Listen for console messages from iframe
window.addEventListener('message', event => {
  if (event.data.type === 'console') {
    addConsoleLine(event.data.args.join(' '), event.data.method);
  }
});

// Run button
document.getElementById('runBtn').addEventListener('click', () => {
  clearConsole();
  addConsoleLine('Running code...', 'info');
  updatePreview();
});

// Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
  clearConsole();
  previewFrame.srcdoc = '';
});

// Clear console button
document.getElementById('clearConsoleBtn').addEventListener('click', clearConsole);

// Auto-run on Ctrl+Enter
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('runBtn').click();
  }
});

// Initial run
setTimeout(() => {
  addConsoleLine('Ready! Press Run or Ctrl+Enter to execute.', 'info');
}, 500);
