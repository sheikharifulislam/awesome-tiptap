import { generateInlineStyle } from '@awesome-tiptap/shared/utils/generateInlineStyle';
import { getAttribute } from '@awesome-tiptap/shared/utils/getAttribute';
import { getElement } from '@awesome-tiptap/shared/utils/getElement';

import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { HTMLAttributes } from 'react';
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

const Image = Node.create<ImageOptions>({
  name: 'image',
  group: 'block',
  content: 'inline*',
  addOptions() {
    return {
      wrapperAttributes: {},
      imgAttributes: {},
      width: 'auto',
      height: '100%',
      objectFit: 'contain',
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
        parseHTML: (element) =>
          getAttribute({
            element,
            attribute: '[data-align]',
          }),
      },
      objectFit: {
        default: 'contain',
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
    const { height, width, src, alt, align, objectFit, showCaption } = node.attrs || {};

    const { minHeight, maxHeight, minWidth, maxWidth } = this.options;

    const wrapperAttrs = {
      'data-provider': 'awesome-tiptap',
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
        mergeAttributes(wrapperAttrs, this.options.wrapperAttributes || {}),
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
});

export { Image };
