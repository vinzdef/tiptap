---
"@tiptap/core": minor
---

Added a new event to handle the removal of nodes from the document

**Example**
```js
const editor = new Editor({
  // ...
  onNodeRemoved: ({ node, range }) => {
    if (node.isText) {
      return
    }

    console.log(`Node ${node.type.name} was removed at range ${range.from}-${range.to}`)
  }
})
```