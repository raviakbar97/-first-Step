#!/bin/bash
# Test script for first-Step app

echo "===== Testing first-Step App ====="
echo ""

# Start server in background
echo "1. Starting server on port 3002..."
cd /root/.openclaw/workspace/first-Step
PORT=3002 npm start > /tmp/test-server.log 2>&1 &
SERVER_PID=$!
sleep 3

# Check if server started
if ! ps -p $SERVER_PID > /dev/null; then
    echo "❌ Server failed to start"
    cat /tmp/test-server.log
    exit 1
fi
echo "✓ Server started (PID: $SERVER_PID)"

# Test HTTP response
echo ""
echo "2. Testing HTTP endpoints..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ Index page loads (HTTP $HTTP_CODE)"
else
    echo "❌ Index page failed (HTTP $HTTP_CODE)"
fi

APP_JS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/js/app.js)
if [ "$APP_JS_CODE" = "200" ]; then
    echo "✓ App.js loads (HTTP $APP_JS_CODE)"
else
    echo "❌ App.js failed (HTTP $APP_JS_CODE)"
fi

CSS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/css/style.css)
if [ "$CSS_CODE" = "200" ]; then
    echo "✓ CSS loads (HTTP $CSS_CODE)"
else
    echo "❌ CSS failed (HTTP $CSS_CODE)"
fi

# Test CDN accessibility
echo ""
echo "3. Testing CDN resources..."
CODEMIRROR_JS=$(curl -s -o /dev/null -w "%{http_code}" https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js)
if [ "$CODEMIRROR_JS" = "200" ]; then
    echo "✓ CodeMirror CDN accessible (HTTP $CODEMIRROR_JS)"
else
    echo "⚠ CodeMirror CDN not accessible (HTTP $CODEMIRROR_JS) - fallback mode will activate"
fi

# Test JavaScript syntax
echo ""
echo "4. Testing JavaScript syntax..."
if node -c public/js/app.js 2>/dev/null; then
    echo "✓ app.js has valid JavaScript syntax"
else
    echo "❌ app.js has syntax errors"
fi

# Stop server
echo ""
echo "5. Cleanup..."
kill $SERVER_PID 2>/dev/null
echo "✓ Server stopped"

echo ""
echo "===== Test Complete ====="
