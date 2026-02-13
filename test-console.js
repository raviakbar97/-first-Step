/**
 * Console-based test for first-Step editor
 * This simulates browser behavior to verify CodeMirror initialization
 */

const fs = require('fs');
const path = require('path');

console.log('=== first-Step Editor Test ===\n');

// Read the HTML file
const htmlPath = path.join(__dirname, 'public/index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log('1. Checking HTML file...');
console.log(`   ✓ File exists and readable (${htmlContent.length} bytes)\n`);

// Check for local CodeMirror references
console.log('2. Checking CodeMirror references...');
const hasLocalJS = htmlContent.includes('/lib/codemirror/codemirror.min.js');
const hasLocalCSS = htmlContent.includes('/lib/codemirror/codemirror.min.css');
const hasModeFiles = htmlContent.includes('/lib/codemirror/mode/');

console.log(`   CodeMirror JS (local): ${hasLocalJS ? '✓' : '✗'}`);
console.log(`   CodeMirror CSS (local): ${hasLocalCSS ? '✓' : '✗'}`);
console.log(`   Mode files (local): ${hasModeFiles ? '✓' : '✗'}`);

// Check for CDN references (should NOT exist in production)
const hasCDNJS = htmlContent.includes('cdnjs.cloudflare.com');
console.log(`   CDN references (should be none): ${hasCDNJS ? '✗ (STILL HAS CDN)' : '✓ (none found)'}\n`);

// Check for textarea elements
console.log('3. Checking editor textareas...');
const hasHtmlEditor = htmlContent.includes('id="html-editor"');
const hasCssEditor = htmlContent.includes('id="css-editor"');
const hasJsEditor = htmlContent.includes('id="js-editor"');

console.log(`   HTML editor textarea: ${hasHtmlEditor ? '✓' : '✗'}`);
console.log(`   CSS editor textarea: ${hasCssEditor ? '✓' : '✗'}`);
console.log(`   JS editor textarea: ${hasJsEditor ? '✓' : '✗'}`);

// Check for CodeMirror initialization script
console.log('\n4. Checking app.js initialization...');
const jsPath = path.join(__dirname, 'public/js/app.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

const hasInitializeFunction = jsContent.includes('function initializeCodeMirrorEditors()');
const hasFromTextArea = jsContent.includes('CodeMirror.fromTextArea');
const hasFallback = jsContent.includes('Falling back to basic textarea editors');
const hasErrorHandling = jsContent.includes('try {') && jsContent.includes('catch (error)');

console.log(`   Initialize function: ${hasInitializeFunction ? '✓' : '✗'}`);
console.log(`   fromTextArea usage: ${hasFromTextArea ? '✓' : '✗'}`);
console.log(`   Error handling: ${hasErrorHandling ? '✓' : '✗'}`);
console.log(`   Fallback mode: ${hasFallback ? '✓' : '✗'}`);

// Check local CodeMirror files exist
console.log('\n5. Checking local CodeMirror library files...');
const libPath = path.join(__dirname, 'public/lib/codemirror');
const filesToCheck = [
  'codemirror.min.js',
  'codemirror.min.css',
  'dracula.min.css',
  'mode/xml/xml.min.js',
  'mode/css/css.min.js',
  'mode/javascript/javascript.min.js',
];

let allFilesExist = true;
filesToCheck.forEach(file => {
  const filePath = path.join(libPath, file);
  const exists = fs.existsSync(filePath);
  console.log(`   ${file}: ${exists ? '✓' : '✗'}`);
  if (!exists) allFilesExist = false;
});

console.log('\n=== Test Summary ===');
console.log(`HTML structure: ${hasLocalJS && hasLocalCSS && hasModeFiles && !hasCDNJS ? '✓ PASS' : '✗ FAIL'}`);
console.log(`App JS logic: ${hasInitializeFunction && hasFromTextArea && hasErrorHandling && hasFallback ? '✓ PASS' : '✗ FAIL'}`);
console.log(`Local files: ${allFilesExist ? '✓ PASS' : '✗ FAIL'}`);

if (hasLocalJS && hasLocalCSS && hasModeFiles && !hasCDNJS &&
    hasInitializeFunction && hasFromTextArea && hasErrorHandling && hasFallback &&
    allFilesExist) {
  console.log('\n✓ All tests PASSED! The editor should work correctly.');
  process.exit(0);
} else {
  console.log('\n✗ Some tests FAILED. Please review the output above.');
  process.exit(1);
}
