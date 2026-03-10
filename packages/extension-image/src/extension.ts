import { generateInlineStyle } from '@awesome-tiptap/shared/utils/generateInlineStyle';
import { getAttribute } from '@awesome-tiptap/shared/utils/getAttribute';
import { getElement } from '@awesome-tiptap/shared/utils/getElement';
import { TextSelection } from '@tiptap/pm/state';
import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { type HTMLAttributes } from 'react';
import { ImageView } from './components/ImageView';

export interface ImageOptions {
  /**
   * HTML attributes to apply to the wrapper element (div or figure).
   * Use this to add custom classes, styles, or data attributes to the container.
   * @example wrapperAttributes: { className: 'my-image-wrapper', 'data-testid': 'image-container' }
   */
  wrapperAttributes?: HTMLAttributes<'div' | 'figure'>;

  /**
   * HTML attributes to apply to the img element.
   * Use this to add custom classes, styles, or attributes like loading="lazy".
   * @example imgAttributes: { className: 'my-image', loading: 'lazy' }
   */
  imgAttributes?: HTMLAttributes<'img'>;

  /**
   * Width for the image in pixels. Applies during initial render.
   * @default 'auto
   * @example width: '100px'
   */
  width?: string;

  /**
   * Minimum width for the image in pixels. Applies during both resizing and initial render.
   * @default undefined
   * @example minWidth: '100px'
   */
  minWidth?: string;

  /**
   * Maximum width for the image in pixels. Applies during both resizing and initial render.
   * @default undefined
   * @example maxWidth: '500px'
   */
  maxWidth?: string;

  /**
   * Height for the image in pixels. Applies during initial render.
   * @default '100%'
   * @example height: '100px'
   */
  height?: string;

  /**
   * Minimum height for the image in pixels. Applies during both resizing and initial render.
   * @default undefined
   * @example minHeight: '100px'
   */
  minHeight?: string;

  /**
   * Maximum height for the image in pixels. Applies during both resizing and initial render.
   * @default undefined
   * @example maxHeight: '500px'
   */
  maxHeight?: string;

  /**
   * Specifies how the image should be resized to fit its container.
   * Uses the CSS object-fit property values.
   * @default 'contain'
   * @example objectFit: 'cover'
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /**
   * Specifies the horizontal alignment of the image within its container.
   * @default 'left'
   * @example align: 'center'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Controls if the image should be resizable and how the resize is configured.
   * - When set to `true`, resizing is enabled with default behavior.
   * - When set to an object, you can configure:
   *   - `enabled`: Whether resizing is enabled.
   *   - `alwaysPreserveAspectRatio`: When `true`, maintains aspect ratio during resize.
   * @default true
   * @example true
   * @example { enabled: true, alwaysPreserveAspectRatio: true }
   */
  resize:
    | {
        enabled: boolean;
        alwaysPreserveAspectRatio?: true;
      }
    | true;
}

export interface SetImageOptions {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  align?: 'left' | 'center' | 'right';
  objectFit?: React.CSSProperties['objectFit'];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       * @param options The image attributes
       * @example
       * editor
       *   .commands
       *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
       */
      setImage: (options: SetImageOptions) => ReturnType;
    };
  }
}

const Image = Node.create<ImageOptions>({
  name: 'image',
  group: 'block',
  content: 'inline*',
  draggable: true,
  addOptions() {
    return {
      wrapperAttributes: {},
      imgAttributes: {},
      width: 'auto',
      height: '100%',
      objectFit: 'cover',
      align: 'left',
      resize: true,
    };
  },
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          getAttribute({
            element,
            selector: 'img',
            attribute: 'src',
          }),
      },
      alt: {
        default: null,
        parseHTML: (element) =>
          getAttribute({
            element,
            selector: 'img',
            attribute: 'alt',
          }),
      },
      width: {
        default: null,
        parseHTML: (element) => getElement(element, 'img')?.style.width || null,
      },
      height: {
        default: null,
        parseHTML: (element) => getElement(element, 'img')?.style.height || null,
      },
      align: {
        default: 'left',
        parseHTML: (element) => element.getAttribute('data-align'),
      },
      objectFit: {
        default: 'cover',
        parseHTML: (element) =>
          getAttribute({
            element,
            selector: 'img',
            attribute: '[data-object-fit]',
          }),
      },
      showCaption: {
        default: false,
        parseHTML: (element) => {
          if (element.tagName === 'FIGURE') {
            return element.getAttribute('data-show-caption') === 'true';
          }
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-provider="awesome-tiptap"]',
      },
      {
        tag: 'figure[data-provider="awesome-tiptap"]',
      },
    ];
  },

  renderHTML({ node }) {
    const { height, width, src, alt, align, objectFit, showCaption } = node.attrs || {};

    const { minHeight, maxHeight, minWidth, maxWidth } = this.options;

    const wrapperAttrs = {
      'data-provider': 'awesome-tiptap-img',
      'data-align': align,
    };

    const imgAttrs = {
      src: src || '',
      alt: alt || '',
      style: generateInlineStyle({
        width: width ?? this.options.width,
        height: height ?? this.options.height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
      }),
      'data-object-fit': objectFit,
    };

    const hasContent = node.content.size > 0;
    if (hasContent) {
      return [
        'figure',
        mergeAttributes(wrapperAttrs, this.options.wrapperAttributes || {}, {
          'data-show-caption': showCaption,
        }),
        ['img', mergeAttributes(imgAttrs, this.options.imgAttributes || {})],
        ['figcaption', node.content],
      ];
    }

    return [
      'div',
      mergeAttributes(wrapperAttrs, this.options.wrapperAttributes || {}),
      ['img', mergeAttributes(imgAttrs, this.options.imgAttributes || {})],
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
  addKeyboardShortcuts() {
    return {
      'Mod-a': ({ editor }) => {
        const { state, view } = editor;
        const { selection } = state;
        const { $from } = selection;

        let imagePos: number | null = null;
        let imageNode: Node | null = null;

        for (let depth = $from.depth; depth >= 0; depth--) {
          const nodeAtDepth = $from.node(depth);
          if (nodeAtDepth.type === this.type) {
            // @ts-expect-error wil fix later
            imageNode = nodeAtDepth;
            // posBefore is the resolved position *before* this node
            imagePos = depth === 0 ? 0 : $from.before(depth);
            break;
          }
        }

        // Not inside an Image → let default behavior happen
        if (!imageNode || imagePos == null) {
          return false;
        }

        // If the caption/content is empty, allow the default progressive select-all
        const contentIsEmpty =
          // @ts-expect-error wil fix later
          imageNode.content.size === 0 || imageNode.textContent.length === 0;

        if (contentIsEmpty) {
          return false;
        }

        // Compute the content range of the image node:
        // content starts at (nodePos + 1) and ends at (nodePos + node.nodeSize - 1)
        const start = imagePos + 1;
        // @ts-expect-error wil fix later
        const end = imagePos + imageNode.nodeSize - 1;

        const tr = state.tr.setSelection(TextSelection.create(state.doc, start, end));
        view.dispatch(tr);

        return true;
      },
    };
  },
  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export { Image };
