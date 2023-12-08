
<!-- Div1.svelte -->

<script>
  

  import {mdToHtml} from './customcode/md';
  import  sanitizeHtml from 'sanitize-html'; 
  let textContent = "## Horizontal Rule\n---\n\n## Text\nThis is **bold** text.\n\nThis is _italic_ text.\n\nThis is ~~strikethrough~~ text.\n\n## Blockquote\n> This is a blockquote.\n\n## Code\n### Inline Code\n`inline code`\n\n### Code Blocks\n```python\ndef example():\n    print(\"Hello, Markdown!\")\n```\n\n## Emphasis\n*italic* or _italic_\n**bold** or __bold__\n\n## Lists\n### Unordered List\n- Item 1\n- Item 2\n  - Subitem 1\n  - Subitem 2\n\n### Ordered List\n1. Item 1\n2. Item 2\n   1. Subitem 1\n   2. Subitem 2\n\n";
  console.log(textContent);
  console.log(mdToHtml(textContent)) 

</script>

<div class="main">
  <div class="editorWrapper">
  <textarea bind:value={textContent} class="editor" />
  </div>
  <div class="previewWrapper">
    <div class="preview">{@html sanitizeHtml(mdToHtml(textContent))}
  </div>
  </div>
</div>

<style>
  /* Add your styles here if needed */
  .main {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
  }
  .editorWrapper {
    width: 50vw;
    height: 100vh;
    border: 1px solid var(--stroke);
  }
  .previewWrapper {
    width: 50vw;
    height: 100vh;
    border: 1px solid var(--stroke);
  }
  .editor {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    font-size: 0.8rem;
    font-family: 'Courier New', Courier, monospace;
    color:var(--white);
    padding:0.3rem 0.8rem;
  }
  .preview {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding:0.3rem 0.8rem;
    color:var(--white);
  }
 

</style>
