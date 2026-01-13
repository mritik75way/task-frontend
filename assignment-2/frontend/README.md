# 📄 Document Versioning System

This repository contains a **Frontend (Web App)** for a document editor with version history, rich-text editing, and side-by-side diff comparison.



# 🌐 Frontend – Web App

## 🚀 Features

* Folder & document browser
* Rich text editor (TipTap)
* Version history panel
* Read-only view for old versions
* Restore previous versions
* Side-by-side diff between any two versions
* Compare a version with the latest version
* Search within document content

---

## 🛠 Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* TipTap (Rich Text Editor)
* diff-match-patch-es

---

## 📦 Installation

```bash
git clone <repo-url>
cd frontend
npm install
```

---

## ▶️ Run Frontend

```bash
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🔧 Configuration

Ensure backend base URL is set correctly:

```ts
export const BASE_URL = "http://localhost:4000";
```

---

## 🧠 How Versioning Works

* Editing is allowed **only on latest version**
* Viewing old versions switches editor to **read-only mode**
* Saving always creates a **new version**
* Restoring creates a **new version** (history is preserved)

---

## 🆚 Diff Comparison

* Select any two versions from Version List
* Or compare a version with the **latest version**
* Diff is displayed **side-by-side**
* Rich text is converted to plain text for diffing

---

## ✅ Notes

* Zod validation has been intentionally removed
* SSR issues handled using `immediatelyRender: false`
* TipTap toolbar supports:

  * Bold
  * Italic
  * Headings (H1, H2)
  * Bullet lists

---

## 📌 Recommended Test Flow

1. Create a document
2. Edit and save multiple versions
3. Open old versions (read-only)
4. Restore an older version
5. Compare two versions
6. Delete document and confirm versions are removed

---

Happy building 🚀
