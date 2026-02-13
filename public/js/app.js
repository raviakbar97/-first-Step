// ===== CODEMIRROR EDITORS =====
let htmlEditor, cssEditor, jsEditor;
let usingCodeMirror = false;
let activeEditor = null;

// Helper function to initialize CodeMirror editors with error handling
function initializeCodeMirrorEditors() {
  try {
    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Check if required textareas exist
    const htmlTextarea = document.getElementById('html-editor');
    const cssTextarea = document.getElementById('css-editor');
    const jsTextarea = document.getElementById('js-editor');

    if (!htmlTextarea || !cssTextarea || !jsTextarea) {
      throw new Error('Required editor textareas not found');
    }

    // Initialize CodeMirror editors
    htmlEditor = CodeMirror.fromTextArea(htmlTextarea, {
      mode: 'xml',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      tabSize: 2,
      indentUnit: 2,
      lineWrapping: true,
    });

    cssEditor = CodeMirror.fromTextArea(cssTextarea, {
      mode: 'css',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseBrackets: true,
      tabSize: 2,
      indentUnit: 2,
      lineWrapping: true,
    });

    jsEditor = CodeMirror.fromTextArea(jsTextarea, {
      mode: 'javascript',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseBrackets: true,
      tabSize: 2,
      indentUnit: 2,
      lineWrapping: true,
    });

    usingCodeMirror = true;
    console.log('CodeMirror editors initialized successfully');

    // Set active editor
    activeEditor = htmlEditor;

    // Initialize display
    htmlEditor.getWrapperElement().style.display = 'block';
    cssEditor.getWrapperElement().style.display = 'none';
    jsEditor.getWrapperElement().style.display = 'none';

    return true;
  } catch (error) {
    console.error('Failed to initialize CodeMirror:', error.message);
    console.warn('Falling back to basic textarea editors');

    // Fallback to basic textareas
    usingCodeMirror = false;

    // Get textareas
    const htmlTextarea = document.getElementById('html-editor');
    const cssTextarea = document.getElementById('css-editor');
    const jsTextarea = document.getElementById('js-editor');

    // Show them as regular textareas
    htmlTextarea.style.display = 'block';
    cssTextarea.style.display = 'none';
    jsTextarea.style.display = 'none';

    // Create wrapper objects that mimic CodeMirror's API
    htmlEditor = {
      textarea: htmlTextarea,
      getValue: () => htmlTextarea.value,
      setValue: (val) => htmlTextarea.value = val,
      getWrapperElement: () => htmlTextarea.parentElement,
      refresh: () => {},
      on: (event, callback) => {
        htmlTextarea.addEventListener(event === 'change' ? 'input' : event, callback);
      }
    };

    cssEditor = {
      textarea: cssTextarea,
      getValue: () => cssTextarea.value,
      setValue: (val) => cssTextarea.value = val,
      getWrapperElement: () => cssTextarea.parentElement,
      refresh: () => {},
      on: (event, callback) => {
        cssTextarea.addEventListener(event === 'change' ? 'input' : event, callback);
      }
    };

    jsEditor = {
      textarea: jsTextarea,
      getValue: () => jsTextarea.value,
      setValue: (val) => jsTextarea.value = val,
      getWrapperElement: () => jsTextarea.parentElement,
      refresh: () => {},
      on: (event, callback) => {
        jsTextarea.addEventListener(event === 'change' ? 'input' : event, callback);
      }
    };

    activeEditor = htmlEditor;

    // Add visual feedback that we're using fallback
    const editorSection = document.querySelector('.editor-section');
    const notice = document.createElement('div');
    notice.style.cssText = 'background-color: #ffc107; color: #000; padding: 0.5rem; text-align: center; font-size: 0.875rem;';
    notice.textContent = '⚠️ Running in basic mode (CodeMirror not available). You can still edit your code.';
    editorSection.insertBefore(notice, editorSection.firstChild);

    return false;
  }
}

// Helper to set CodeMirror theme
function setEditorTheme(theme) {
  if (usingCodeMirror) {
    if (theme === 'light') {
      htmlEditor.setOption('theme', 'default');
      cssEditor.setOption('theme', 'default');
      jsEditor.setOption('theme', 'default');
    } else {
      htmlEditor.setOption('theme', 'dracula');
      cssEditor.setOption('theme', 'dracula');
      jsEditor.setOption('theme', 'dracula');
    }
  }
}

// ===== THEME MANAGEMENT =====
const STORAGE_KEYS = {
  theme: 'firststep-theme',
  snippets: 'firststep-snippets',
  currentSnippet: 'firststep-current-snippet',
};

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    setEditorTheme('light');
  } else {
    document.body.classList.remove('light-theme');
    setEditorTheme('dark');
  }
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.value = savedTheme;
  }
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
  if (modal) modal.classList.add('active');
  renderSnippetList();
}

function closeModal() {
  if (modal) modal.classList.remove('active');
}

function renderSnippetList() {
  const snippetList = document.getElementById('snippetList');
  if (!snippetList) return;

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
function initTabSwitching() {
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
        showEditor(htmlEditor, cssEditor, jsEditor);
      } else if (lang === 'css') {
        showEditor(cssEditor, htmlEditor, jsEditor);
      } else if (lang === 'js') {
        showEditor(jsEditor, htmlEditor, cssEditor);
      }

      // Refresh editor
      if (activeEditor && activeEditor.refresh) {
        activeEditor.refresh();
      }
    });
  });
}

function showEditor(active, hide1, hide2) {
  if (usingCodeMirror) {
    active.getWrapperElement().style.display = 'block';
    hide1.getWrapperElement().style.display = 'none';
    hide2.getWrapperElement().style.display = 'none';
  } else {
    // Fallback mode
    active.textarea.style.display = 'block';
    hide1.textarea.style.display = 'none';
    hide2.textarea.style.display = 'none';
  }
  activeEditor = active;
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
  if (usingCodeMirror) {
    htmlEditor.refresh();
    cssEditor.refresh();
    jsEditor.refresh();
  }
});

// ===== PREVIEW & CONSOLE =====
const previewFrame = document.getElementById('preview-frame');
const consoleOutput = document.getElementById('console-output');

function addConsoleLine(message, type = 'log') {
  if (!consoleOutput) return;

  const line = document.createElement('div');
  line.className = `console-line console-${type}`;

  const timestamp = new Date().toLocaleTimeString();
  line.textContent = `[${timestamp}] ${message}`;

  consoleOutput.appendChild(line);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
  if (!consoleOutput) return;
  consoleOutput.innerHTML = '<div class="console-line console-info">> Console cleared</div>';
}

function updatePreview() {
  if (!previewFrame) return;

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
function initEventListeners() {
  // Run button
  const runBtn = document.getElementById('runBtn');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      clearConsole();
      addConsoleLine('Running code...', 'info');
      updatePreview();
    });
  }

  // Clear button
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearConsole();
      if (previewFrame) previewFrame.srcdoc = '';
    });
  }

  // Clear console button
  const clearConsoleBtn = document.getElementById('clearConsoleBtn');
  if (clearConsoleBtn) {
    clearConsoleBtn.addEventListener('click', clearConsole);
  }

  // Auto-run on Ctrl+Enter
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (runBtn) runBtn.click();
    }
  });

  // Theme selector
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', e => {
      setTheme(e.target.value);
    });
  }

  // Save snippet button
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveSnippet);
  }

  // Load snippet button
  const loadBtn = document.getElementById('loadBtn');
  if (loadBtn) {
    loadBtn.addEventListener('click', openModal);
  }

  // Close modal button
  const closeModalBtn = document.getElementById('closeModal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal on outside click
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Auto-save on editor change (debounced)
  let autoSaveTimeout;

  const setupAutoSave = (editor) => {
    editor.on('change', () => {
      clearTimeout(autoSaveTimeout);
      autoSaveTimeout = setTimeout(saveCurrentWork, 1000);
    });
  };

  setupAutoSave(htmlEditor);
  setupAutoSave(cssEditor);
  setupAutoSave(jsEditor);
}

// ===== INITIALIZATION =====
function initApp() {
  console.log('Initializing first-Step app...');

  // Initialize editors
  const codeMirrorLoaded = initializeCodeMirrorEditors();

  if (codeMirrorLoaded) {
    console.log('✓ CodeMirror loaded successfully');
  } else {
    console.warn('⚠ CodeMirror not available, using fallback editors');
    addConsoleLine('Running in basic mode - some features may be limited', 'warn');
  }

  // Initialize other components
  loadTheme();
  loadCurrentWork();
  initTabSwitching();
  initEventListeners();

  // Initial run
  setTimeout(() => {
    addConsoleLine('Ready! Press Run or Ctrl+Enter to execute.', 'info');
  }, 500);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
