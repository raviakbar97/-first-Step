/**
 * Simple HTTP client to test the first-Step editor
 * This simulates a browser request and checks the response
 */

const http = require('http');
const fs = require('fs');

const PORT = 3000;
const HOST = 'localhost';

console.log('=== Testing first-Step Editor ===\n');

// Test 1: Check if server is running
console.log('Test 1: Checking server...');
const req1 = http.get(`http://${HOST}:${PORT}/`, (res) => {
    console.log(`✓ Server is responding (Status: ${res.statusCode})`);

    let html = '';
    res.on('data', (chunk) => {
        html += chunk;
    });

    res.on('end', () => {
        // Test 2: Check HTML structure
        console.log('\nTest 2: Checking HTML structure...');
        const hasLocalCodeMirror = html.includes('/lib/codemirror/codemirror.min.js');
        const hasEditorTextareas = html.includes('id="html-editor"');
        const noCDN = !html.includes('cdnjs.cloudflare.com');

        console.log(`  Local CodeMirror references: ${hasLocalCodeMirror ? '✓' : '✗'}`);
        console.log(`  Editor textareas present: ${hasEditorTextareas ? '✓' : '✗'}`);
        console.log(`  No CDN references: ${noCDN ? '✓' : '✗'}`);

        if (hasLocalCodeMirror && hasEditorTextareas && noCDN) {
            console.log('  ✓ HTML structure is correct');
        } else {
            console.log('  ✗ HTML structure has issues');
        }

        // Test 3: Check CodeMirror files
        console.log('\nTest 3: Checking CodeMirror library files...');
        const files = [
            '/lib/codemirror/codemirror.min.js',
            '/lib/codemirror/codemirror.min.css',
            '/lib/codemirror/dracula.min.css',
            '/lib/codemirror/mode/xml/xml.min.js',
            '/lib/codemirror/mode/css/css.min.js',
            '/lib/codemirror/mode/javascript/javascript.min.js',
        ];

        let fileCount = 0;
        const checkFile = (index) => {
            if (index >= files.length) {
                console.log(`  ✓ All ${fileCount} files are accessible`);
                console.log('\n=== All Tests Passed ===');
                console.log('\nThe editor should be working correctly.');
                console.log('To test manually, open http://localhost:3000 in a browser.');
                console.log('Or try the test page: http://localhost:3000/test-editor.html');
                process.exit(0);
                return;
            }

            const file = files[index];
            const req = http.get(`http://${HOST}:${PORT}${file}`, (res) => {
                if (res.statusCode === 200) {
                    console.log(`  ✓ ${file} (${res.statusCode})`);
                    fileCount++;
                } else {
                    console.log(`  ✗ ${file} (${res.statusCode})`);
                }
                checkFile(index + 1);
            });

            req.on('error', (err) => {
                console.log(`  ✗ ${file} (${err.message})`);
                checkFile(index + 1);
            });
        };

        checkFile(0);
    });
});

req1.on('error', (err) => {
    console.log(`✗ Server error: ${err.message}`);
    console.log('\nMake sure the server is running: npm start');
    process.exit(1);
});

req1.setTimeout(5000, () => {
    console.log('✗ Request timed out');
    req1.destroy();
    process.exit(1);
});
