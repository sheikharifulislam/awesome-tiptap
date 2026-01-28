import { Image } from '@awesome-tiptap/extension-image';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        insertImage: (url: string) =>
          ctx.editor.chain().focus().setImage({ src: url }).run(),
      };
    },
  });

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => {
            const url = window.prompt('Image URL');
            if (url) {
              editorState.insertImage(url);
            }
          }}
        >
          Image
        </button>
        <button
          onClick={() => {
            console.log('to the html', editor.getHTML());
          }}
        >
          Html
        </button>
      </div>
    </div>
  );
}

function App() {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: `
<div data-provider="awesome-tiptap" style="width: 400px; height: 300px;">
	<img src="https://images.pexels.com/photos/35004348/pexels-photo-35004348.jpeg" alt="Description of image" />
</div>

<figure data-provider="awesome-tiptap" style="width: 400px; height: 300px;">
	<img
    src="https://cdn.pixabay.com/photo/2025/12/28/13/04/giant-panda-10039235_1280.jpg"
    alt="Elephant at sunset" />
	<figcaption>An elephant at sunset</figcaption>
</figure>`,
  });
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default App;
