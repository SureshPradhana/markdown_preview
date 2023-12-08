// write simple addition function and export it
// export function add(a: number, b: number) {
//   return a + b;
// }

// import makred an export it
import {marked} from "marked";
import katex from "katex";
import "katex/dist/katex.css";
  
const renderer :any= new marked.Renderer();
  
  const replacer = (((blockRegex, inlineRegex) => (text:string) => {
      text = text.replace(blockRegex, (match, expression) => {
          return katex.renderToString(expression, {displayMode: true});
      });
  
      text = text.replace(inlineRegex, (match, expression) => {
          return katex.renderToString(expression, {displayMode: false});
      });
  
      return text;
  })(/\$\$([\s\S]+?)\$\$/g, /\$([^\n\s]+?)\$/g));
  
  const replaceTypes = ["listitems", "paragraph", "tablecell", "text"];
  replaceTypes.forEach(type => {``
      const original = renderer[type];
      renderer[type] = (...args: string[]) => {
          args[0] = replacer(args[0]);
          return original(...args);
      };
  });
  

export function mdToHtml(md: string) {
    return marked(md,{renderer: renderer});
    }

