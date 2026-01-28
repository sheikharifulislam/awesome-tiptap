import { getAttribute } from '@awesome-tiptap/utils';
import type { ImageOptions, SetImageOptions } from '@tiptap/extension-image';
import { inputRegex } from '@tiptap/extension-image';
import { Node, ReactNodeViewRenderer } from '@tiptap/react';
import { ImageView } from './components/ImageView';

interface ImageAttributes {
  src: string | null;
  alt?: string | null;
  title?: string | null;
  width?: string | null;
  height?: string | null;
  'data-align'?: string | null;
}

const parseImageAttributes = (img: Element): Partial<ImageAttributes> => ({
  src: img.getAttribute('src'),
  alt: img.getAttribute('alt'),
  title: img.getAttribute('title'),
  width: img.getAttribute('width'),
  height: img.getAttribute('height'),
});

function buildImageHTMLAttributes(attrs: ImageAttributes): Record<string, string> {
  const result: Record<string, string> = { src: attrs.src || '' };

  if (attrs.alt) result.alt = attrs.alt;
  if (attrs.title) result.title = attrs.title;
  if (attrs.width) result.width = attrs.width;
  if (attrs.height) result.height = attrs.height;

  return result;
}

const Image = Node.create<ImageOptions>({
  group: 'block',
  name: 'image',
  content: 'inline*',
  addAttributes: () => {
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
        parseHTML: (element) => element.style.width,
      },
      height: {
        default: null,
        parseHTML: (element) => element.style.height,
      },
      align: {
        default: null,
        parseHTML: (element) =>
          getAttribute({
            element,
            attribute: '[data-align]',
          }),
      },
      showCaption: {
        default: false,
        parseHTML: (element) => {
          if (element.tagName === 'FIGURE') {
            return (
              getAttribute({
                element,
                attribute: 'data-show-caption',
              }) === 'true'
            );
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
    const { height, width, src, alt, align, showCaption } = node.attrs || {};
    const wrapperAttrs = {
      'data-provider': 'awesome-tiptap',
      style: `height: ${height || 'auto'}; width: ${width || 'auto'};`,
      ...((align && { 'data-align': align }) || {}),
    };

    const imgAttrs = {
      src: src || '',
      ...(alt ? { alt } : {}),
    };

    const hasContent = node.content.size > 0;
    if (hasContent) {
      return ['figure', wrapperAttrs, ['img', imgAttrs], ['figcaption', node.content]];
    }

    return ['div', wrapperAttrs, ['img', imgAttrs]];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});

export { Image, inputRegex };
export type { ImageOptions, SetImageOptions };
