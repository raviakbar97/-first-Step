# first-Step - Project Plan

## 🎯 Goal

Build a minimal fullstack web app for viewing and running HTML/CSS/JS code snippets in real-time with syntax highlighting and console output.

## 📋 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser Client                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Frontend (Vanilla JS)                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │   UI     │  │  CodeMirror│ │Console   │           │  │
│  │  │  Header  │  │  Editor   │  │  Output  │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          │ HTTP API                          │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Server (Node/Express)            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Endpoints                                        │  │
│  │  - POST /api/run      → Execute code safely          │  │
│  │  - POST /api/upload   → Save/share snippet           │  │
│  │  - GET  /api/snippets → List available snippets      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Code Execution (Sandboxed)                          │  │
│  │  - vm2 or isolated-vm                                │  │
│  │  - Timeout protection                                │  │
│  │  - Console output capture                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🛠 Tech Stack

### Frontend

- **HTML5**: Semantic markup
- **CSS3**: Flexbox/Grid, Mobile-first responsive design
- **Vanilla JavaScript**: No framework dependencies
- **CodeMirror 6**: Code editor with syntax highlighting (lighter than Monaco)
- **Fetch API**: Backend communication

### Backend

- **Node.js 18+**: Runtime
- **Express 4.x**: Web server
- **vm2 or isolated-vm**: Sandboxed code execution
- **cors**: Cross-origin support

### Dev Tools

- **Prettier**: Code formatting
- **ESLint**: Linting (lightweight config)
- **Git**: Version control

## 📁 File Tree

```
first-Step/
├── plan.md                 # This file
├── README.md               # Project documentation
├── package.json            # Dependencies & scripts
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier config
├── .eslintrc.json          # ESLint config
│
├── public/                 # Static assets
│   ├── index.html          # Main HTML page
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       ├── app.js          # Main application logic
│       ├── editor.js       # CodeMirror integration
│       └── runner.js       # Code execution & console
│
└── server/
    ├── index.js            # Express server entry
    ├── routes.js           # API routes
    ├── execute.js          # Sandboxed code execution
    └── snippets.js         # Snippet storage (in-memory)
```

## 🎨 UI Design

### Layout (Mobile-First)

```
┌─────────────────────────────┐
│  [Logo] first-Step    [Run] │  Header
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │  Code Editor (Tabs)    │  │
│  │  ┌─ HTML ─┐ ┌CSS┐ ┌JS┐ │  │  Language tabs
│  │  └─────────┘ └───┘ └──┘ │  │
│  │  ┌───────────────────┐  │
│  │  │                   │  │  │
│  │  │   CodeMirror      │  │  │  Editor area
│  │  │                   │  │  │
│  │  └───────────────────┘  │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │  Live Preview          │  │  Iframe preview
│  │  ┌─────────────────┐  │  │
│  │  │                 │  │  │
│  │  │   Rendered      │  │  │
│  │  │                 │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │  Console Output        │  │
│  │  > console.log(...)    │  │
│  │  > Result...           │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Desktop Layout (Split View)

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] first-Step        [Run] [Share] [Clear]             │
├──────────────────────┬──────────────────────────────────────┤
│  Code Editor         │  Live Preview                         │
│  ┌─ HTML ─┐ ┌CSS┐ ┌JS┐│  ┌────────────────────────────────┐  │
│  └─────────┘ └───┘ └──┘│  │                                │  │
│  ┌──────────────────┐  │  │   Rendered HTML                 │  │
│  │                  │  │  │   + CSS & JS execution         │  │
│  │   CodeMirror     │  │  │                                │  │
│  │                  │  │  └────────────────────────────────┘  │
│  └──────────────────┘  │                                        │
│                      │  ┌────────────────────────────────┐  │
│                      │  │  Console Output                  │  │
│                      │  │  > console.log(...)              │  │
│                      │  │  > Result...                     │  │
│                      │  └────────────────────────────────┘  │
└──────────────────────┴──────────────────────────────────────┘
```

## 🚀 Milestones

### Milestone 1: Project Setup (Current)

- [x] Create workspace folder
- [x] Initialize git repository
- [x] Setup remote GitHub repository
- [x] Create plan.md with architecture
- [x] Create README.md
- [ ] Create package.json with dependencies
- [ ] Setup .gitignore
- [ ] Create basic frontend structure
- [ ] Initial commit & push

### Milestone 2: Basic Frontend

- [ ] Create index.html with responsive layout
- [ ] Add CSS for mobile-first design
- [ ] Integrate CodeMirror editor
- [ ] Create tab system (HTML/CSS/JS)
- [ ] Implement live preview iframe
- [ ] Add console output panel
- [ ] Test manually in browser

### Milestone 3: Backend API

- [ ] Setup Express server
- [ ] Create /api/run endpoint
- [ ] Implement sandboxed JS execution
- [ ] Add console output capture
- [ ] Test API with curl/Postman

### Milestone 4: Frontend-Backend Integration

- [ ] Connect frontend to API
- [ ] Real-time code execution
- [ ] Console output display
- [ ] Error handling
- [ ] End-to-end testing

### Milestone 5: Polish & Deploy

- [ ] Responsive optimization
- [ ] Error boundary & user feedback
- [ ] Documentation
- [ ] Deploy to Vercel/Netlify (frontend)
- [ ] Demo link

## ⚡ Development Workflow

For each step:

1. **Code**: Write the implementation
2. **Lint**: Run `npm run lint` (ESLint)
3. **Format**: Run `npm run format` (Prettier)
4. **Test**: Manual testing
5. **Fix**: If errors, retry (max 3x)
6. **Commit**: `git add . && git commit -m "milestone X: desc"`
7. **Push**: `git push`

## 📦 Dependencies (Minimal)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "vm2": "^3.9.19"
  },
  "devDependencies": {
    "prettier": "^3.1.1",
    "eslint": "^8.56.0"
  }
}
```

## 🔒 Security Considerations

- **Sandboxed Execution**: Use vm2 for isolation
- **Timeout**: Max 5s execution time
- **Memory Limit**: Cap at 100MB
- **No File System Access**: Prevent fs operations
- **Rate Limiting**: Prevent abuse (future)

## 📊 Progress Tracking

- **Start**: 2025-02-13
- **Status**: Milestone 1 in progress
- **Next**: Basic frontend structure
