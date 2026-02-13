// ===== CODEMIRROR EDITORS =====
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

// ===== THEME MANAGEMENT =====
const STORAGE_KEYS = {
  theme: 'firststep-theme',
  snippets: 'firststep-snippets',
  currentSnippet: 'firststep-current-snippet',
};

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    htmlEditor.setOption('theme', 'default');
    cssEditor.setOption('theme', 'default');
    jsEditor.setOption('theme', 'default');
  } else {
    document.body.classList.remove('light-theme');
    htmlEditor.setOption('theme', 'dracula');
    cssEditor.setOption('theme', 'dracula');
    jsEditor.setOption('theme', 'dracula');
  }
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  document.getElementById('themeSelect').value = savedTheme;
  setTheme(savedTheme);
}

// ===== SNIPPET MANAGEMENT =====
function getSnippets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.snippets) || '[]');
  } catch (e) {
    return [];
  }
}

function saveSnippet() {
  const name = prompt('Enter a name for this snippet:');
  if (!name) return;

  const snippet = {
    id: Date.now().toString(),
    name,
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue(),
    createdAt: new Date().toISOString(),
  };

  const snippets = getSnippets();
  snippets.unshift(snippet); // Add to beginning

  try {
    localStorage.setItem(STORAGE_KEYS.snippets, JSON.stringify(snippets));
    addConsoleLine(`Snippet "${name}" saved successfully!`, 'info');
  } catch (e) {
    addConsoleLine(`Error saving snippet: ${e.message}`, 'error');
  }
}

function deleteSnippet(id) {
  if (!confirm('Are you sure you want to delete this snippet?')) return;

  const snippets = getSnippets().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.snippets, JSON.stringify(snippets));

  renderSnippetList();
  addConsoleLine('Snippet deleted', 'info');
}

function loadSnippet(id) {
  const snippets = getSnippets();
  const snippet = snippets.find(s => s.id === id);

  if (!snippet) {
    addConsoleLine('Snippet not found', 'error');
    return;
  }

  htmlEditor.setValue(snippet.html);
  cssEditor.setValue(snippet.css);
  jsEditor.setValue(snippet.js);

  closeModal();
  addConsoleLine(`Snippet "${snippet.name}" loaded`, 'info');
  updatePreview();
}

// ===== MODAL =====
const modal = document.getElementById('snippetModal');

function openModal() {
  modal.classList.add('active');
  renderSnippetList();
}

function closeModal() {
  modal.classList.remove('active');
}

function renderSnippetList() {
  const snippetList = document.getElementById('snippetList');
  const snippets = getSnippets();

  if (snippets.length === 0) {
    snippetList.innerHTML = '<div class="snippet-empty">No saved snippets yet</div>';
    return;
  }

  snippetList.innerHTML = snippets
    .map(
      snippet => `
        <div class="snippet-item" data-id="${snippet.id}">
            <div class="snippet-info">
                <div class="snippet-name">${escapeHtml(snippet.name)}</div>
                <div class="snippet-date">${new Date(snippet.createdAt).toLocaleString()}</div>
            </div>
            <div class="snippet-actions">
                <button class="snippet-btn load" onclick="loadSnippet('${snippet.id}')">Load</button>
                <button class="snippet-btn delete" onclick="deleteSnippet('${snippet.id}')">Delete</button>
            </div>
        </div>
    `
    )
    .join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== AUTO-SAVE CURRENT WORK =====
function saveCurrentWork() {
  try {
    const current = {
      html: htmlEditor.getValue(),
      css: cssEditor.getValue(),
      js: jsEditor.getValue(),
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.currentSnippet, JSON.stringify(current));
  } catch (e) {
    // Ignore auto-save errors
  }
}

function loadCurrentWork() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.currentSnippet);
    if (saved) {
      const current = JSON.parse(saved);
      // Only load if less than 24 hours old
      if (Date.now() - current.timestamp < 24 * 60 * 60 * 1000) {
        htmlEditor.setValue(current.html);
        cssEditor.setValue(current.css);
        jsEditor.setValue(current.js);
        addConsoleLine('Restored previous work', 'info');
      }
    }
  } catch (e) {
    // Ignore load errors
  }
}

// ===== TAB SWITCHING =====
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

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
  htmlEditor.refresh();
  cssEditor.refresh();
  jsEditor.refresh();
});

// ===== PREVIEW & CONSOLE =====
const previewFrame = document.getElementById('preview-frame');
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

// ===== EVENT LISTENERS =====
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

// Theme selector
document.getElementById('themeSelect').addEventListener('change', e => {
  setTheme(e.target.value);
});

// Save snippet button
document.getElementById('saveBtn').addEventListener('click', saveSnippet);

// Load snippet button
document.getElementById('loadBtn').addEventListener('click', openModal);

// Close modal button
document.getElementById('closeModal').addEventListener('click', closeModal);

// Close modal on outside click
modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});

// Auto-save on editor change (debounced)
let autoSaveTimeout;
htmlEditor.on('change', () => {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(saveCurrentWork, 1000);
});
cssEditor.on('change', () => {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(saveCurrentWork, 1000);
});
jsEditor.on('change', () => {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(saveCurrentWork, 1000);
});

// ===== INITIALIZATION =====
loadTheme();
loadCurrentWork();

// Initial run
setTimeout(() => {
  addConsoleLine('Ready! Press Run or Ctrl+Enter to execute.', 'info');
}, 500);
