const express = require('express');
const router = express.Router();

// Sandbox execution module
const execute = require('./execute');

// In-memory snippets storage
const snippets = [];

// POST /api/run - Execute code
router.post('/run', async (req, res) => {
  try {
    const { html, css, js } = req.body;

    // Validate input
    if (!html && !css && !js) {
      return res.status(400).json({
        success: false,
        error: 'At least one code type must be provided',
      });
    }

    // Execute JavaScript (safely sandboxed)
    let jsOutput = [];
    let jsError = null;

    if (js && js.trim()) {
      const result = execute.runJS(js);
      jsOutput = result.output;
      jsError = result.error;
    }

    // Return result
    res.json({
      success: true,
      output: jsOutput,
      error: jsError,
    });
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to execute code',
      details: error.message,
    });
  }
});

// POST /api/snippets - Save a snippet
router.post('/snippets', (req, res) => {
  try {
    const { html, css, js, name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Snippet name is required',
      });
    }

    const snippet = {
      id: Date.now().toString(),
      name,
      html: html || '',
      css: css || '',
      js: js || '',
      createdAt: new Date().toISOString(),
    };

    snippets.push(snippet);

    res.json({
      success: true,
      snippet,
    });
  } catch (error) {
    console.error('Save snippet error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save snippet',
    });
  }
});

// GET /api/snippets - List all snippets
router.get('/snippets', (req, res) => {
  res.json({
    success: true,
    snippets: snippets.map(s => ({
      id: s.id,
      name: s.name,
      createdAt: s.createdAt,
    })),
  });
});

// GET /api/snippets/:id - Get a specific snippet
router.get('/snippets/:id', (req, res) => {
  const snippet = snippets.find(s => s.id === req.params.id);

  if (!snippet) {
    return res.status(404).json({
      success: false,
      error: 'Snippet not found',
    });
  }

  res.json({
    success: true,
    snippet,
  });
});

module.exports = router;
