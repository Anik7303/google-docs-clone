import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function TextEditor() {
  // const wrapperRef = useRef();
  // useEffect(() => {
  //   const element = wrapperRef.current;
  //   const editor = document.createElement("div");
  //   element.append(editor);
  //   new Quill(editor, { theme: "snow" });

  //   return () => {
  //     if (element) {
  //       element.innerHTML = "";
  //     }
  //   };
  // }, []);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper) {
      const editor = document.createElement("div");
      wrapper.innerHTML = "";
      wrapper.append(editor);
      new Quill(editor, {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });
    }
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}

export default TextEditor;
