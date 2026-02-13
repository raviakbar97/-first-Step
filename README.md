# first-Step

A minimal web app for viewing and running HTML/CSS/JS code snippets in real-time with syntax highlighting and console output.

## 🎯 Features

- **Live Code Editor**: Edit HTML, CSS, and JavaScript in real-time
- **Syntax Highlighting**: Powered by CodeMirror 6
- **Instant Preview**: See your code rendered immediately
- **Console Output**: Capture and display console.log messages
- **Responsive Design**: Mobile-first, works on all devices
- **Sandboxed Execution**: Safe code execution with vm2
- **Zero Frameworks**: Built with vanilla JavaScript

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone git@github.com:raviakbar97/first-Step.git
cd first-Step

# Install dependencies
npm install

# Start the server
npm start
```

### Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Select the tab (HTML, CSS, or JavaScript) you want to edit
3. Write your code in the editor
4. Click "Run" to execute and see the preview
5. Check the console output panel for logs and errors

## 📁 Project Structure

```
first-Step/
├── public/              # Frontend files
│   ├── index.html      # Main page
│   ├── css/
│   │   └── style.css   # Styles
│   └── js/
│       ├── app.js      # App logic
│       ├── editor.js   # CodeMirror integration
│       └── runner.js   # Code execution
└── server/             # Backend files
    ├── index.js        # Express server
    ├── routes.js       # API routes
    └── execute.js      # Sandboxed execution
```

## 🛠 Tech Stack

### Frontend

- HTML5, CSS3, Vanilla JavaScript
- CodeMirror 6 for code editing
- Fetch API for backend communication

### Backend

- Node.js + Express
- vm2 for sandboxed code execution

## 📖 API Endpoints

### POST /api/run

Execute JavaScript code in a sandboxed environment.

**Request:**

```json
{
  "html": "<h1>Hello</h1>",
  "css": "h1 { color: blue; }",
  "js": "console.log('Hello World')"
}
```

**Response:**

```json
{
  "success": true,
  "output": ["Hello World"],
  "error": null
}
```

## 🔒 Security

Code execution is sandboxed with the following restrictions:

- Maximum execution time: 5 seconds
- Memory limit: 100MB
- No file system access
- No network requests
- Isolated from the main process

## 🎨 Design Philosophy

- **Minimal**: No unnecessary dependencies
- **Fast**: Lightweight, instant feedback
- **Responsive**: Works on mobile and desktop
- **Clean**: Simple, intuitive UI
- **Safe**: Sandboxed code execution

## 📝 Development

```bash
# Format code
npm run format

# Lint code
npm run lint

# Start development server
npm start

# Run tests (when available)
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🔗 Links

- GitHub: https://github.com/raviakbar97/first-Step
- Demo: (coming soon)

---

Built with ❤️ using vanilla JavaScript and Express
