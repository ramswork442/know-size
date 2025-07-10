# know-size

**know-size** is a simple colorful CLI tool to check file and folder sizes in your project directory.  
It helps you spot large files and keep your codebase clean and optimisez — especially useful before going to production.

---

## Installation

```bash
npm install -g know-size
```

## Sample Output

```js
Desktop>my-project>know-size 
📁 my-project/ (Total: 1.89 MB)
    📁 folder1/ (Total: 3.97 kB)
    ├── hello.js - 3.97 kB
    📁 src/ (Total: 3.18 kB)
    ├── App.js - 793 B
    ├── index.js - 2.39 kB
├── video.mp4 - 1.88 MB  ⚠️  LARGE
```

✅ Large files (over 100KB) are highlighted,
🚫 Common folders like node_modules, .git, build, etc., are skipped
📁 Folder totals are displayed,

## Different options for Installation & Usage

Option 1: Run instantly with npx:

```bash
reference from above folder
npx know-size my-project         
npx know-size my-project src         # Analyze a specific folder
```

Option 2: Install it once and run from anywhere:

```bash
reference from above folder
npm install -g know-size      
know-size my-project          # Analyze a specific folder
know-size my-project src  
```

Option 3: Add to a project (locally):

```bash
npm install know-size
```

```json
"scripts": {
  "know-size": "know-size"
}
```

```bash
npm run know-size 
```


