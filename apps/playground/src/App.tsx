import { Image } from '@awesome-tiptap/extension-image';
import FloatingToolbar from '@awesome-tiptap/floating-toolbar';
import { Selection } from '@tiptap/extensions';
import {
  EditorContent,
  EditorContext,
  useEditor,
  useEditorState,
  type Editor,
} from '@tiptap/react';
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
    extensions: [
      StarterKit,
      Selection,
      Image.configure({
        // width: '300px',
        // height: '300px',
        // maxHeight: '500px',
        // maxWidth: '500px',
        // minHeight: '100px',
        // minWidth: '100px',
      }),
    ],
    content: `
      <div data-provider="awesome-tiptap">
        <img src="https://images.pexels.com/photos/35004348/pexels-photo-35004348.jpeg" alt="Description of image" />
      </div>
      <figure data-provider="awesome-tiptap" data-show-caption="true">
      <img
        src="https://cdn.pixabay.com/photo/2025/12/28/13/04/giant-panda-10039235_1280.jpg"
        alt="Elephant at sunset" />
        <figcaption>An elephant at sunset</figcaption>
    </figure>
      `,
  });
  return (
    <div
      style={{
        width: '800px',
        margin: '0 auto',
        marginTop: '100px',
      }}
    >
      <EditorContext.Provider value={{ editor }}>
        <MenuBar editor={editor} />
        <div
          style={{
            marginTop: '50px',
          }}
        >
          <EditorContent
            editor={editor}
            role="presentation"
            className="notion-like-editor-content"
          >
            <FloatingToolbar>
              <div
                style={{
                  background: 'red',
                }}
              >
                <span>this is a string</span>
              </div>
            </FloatingToolbar>
          </EditorContent>
        </div>
      </EditorContext.Provider>
    </div>
  );
}

export default App;
