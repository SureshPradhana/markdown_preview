
<!-- Div1.svelte -->

<script>
  import {marked} from 'marked';
  import  sanitizeHtml from 'sanitize-html'; 
  import katex from 'katex';
  let textContent = "## Horizontal Rule\n---\n\n## Text\nThis is **bold** text.\n\nThis is _italic_ text.\n\nThis is ~~strikethrough~~ text.\n\n## Blockquote\n> This is a blockquote.\n\n## Code\n### Inline Code\n`inline code`\n\n### Code Blocks\n```python\ndef example():\n    print(\"Hello, Markdown!\")\n```\n\n## Emphasis\n*italic* or _italic_\n**bold** or __bold__\n\n## Lists\n### Unordered List\n- Item 1\n- Item 2\n  - Subitem 1\n  - Subitem 2\n\n### Ordered List\n1. Item 1\n2. Item 2\n   1. Subitem 1\n   2. Subitem 2\n\n";


  const renderer = new marked.Renderer();

  function mathsExpression(expr) {
    if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
      expr = expr.substr(2, expr.length - 4);
      return katex.renderToString(expr, { displayMode: true });
    } else if (expr.match(/^\$[\s\S]*\$$/)) {
      expr = expr.substr(1, expr.length - 2);
      return katex.renderToString(expr, { isplayMode: false });
    }
  }

  const rendererCode = renderer.code;
  renderer.code = function(code, lang, escaped) {
    if (!lang) {
      const math = mathsExpression(code);
      if (math) {
        return math;
      }
    }

    return rendererCode(code, lang, escaped);
  };

const rendererCodespan = renderer.codespan;
renderer.codespan = function(text) {
  const math = mathsExpression(text);

  if (math) {
    return math;
  }

  return rendererCodespan(text);
};

const md = '`$$c=\sqrt{a^2 + b^2}$$`';

console.log(marked(md, { renderer: renderer }));
</script>

<div class="main">
  <div class="editorWrapper">
  <textarea bind:value={textContent} class="editor" />
  </div>
  <div class="previewWrapper">
    <div class="preview">{@html sanitizeHtml(marked(textContent,{renderer:renderer}))}
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
