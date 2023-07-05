# React Hooks实现预览pdf


### 方法一

```js
import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  ForwardedRef
} from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import { PdfViewerProps } from './types';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';
import styles from './style/index.module.less';

let pdfDocument: any;
let pdfViewer: any;
let pdfLinkService: any;
let pdfHistory: any;
const USE_ONLY_CSS_ZOOM = true;
const TEXT_LAYER_MODE = 0; // DISABLE
const MAX_IMAGE_SIZE = 1024 * 1024;
const CMAP_URL = '../../../node_modules/pdfjs-dist/cmaps/';
const CMAP_PACKED = true;

const DEFAULT_SCALE_VALUE = 'auto';
// const CSS = 96.0;
// const PDF = 72.0;
// const PDF_TO_CSS_UNITS = CSS / PDF;
const DEFAULT_SCALE_DELTA = 1.1;
const MIN_SCALE = 0.25;
const MAX_SCALE = 10.0;

interface PdfViewerRef {
  zoomIn: (ticks: number) => void;
  zoomOut: (ticks: number) => void;
}

const PdfViewers = forwardRef(
  (props: PdfViewerProps, ref: ForwardedRef<PdfViewerRef>) => {
    const { url } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [error, setError] = useState('');
    const [errorMoreInfo, setErrorMoreInfo] = useState('');
    const [l10n, setL10n] = useState<PDFViewer['l10n']>();
    const [size, setSize] = useState({ width: '', height: '' });

    const initUI = () => {
      const eventBus = new pdfjsViewer.EventBus();

      const linkService = new pdfjsViewer.PDFLinkService({
        eventBus
      });

      const l10n = pdfjsViewer.NullL10n;
      setL10n(l10n);

      pdfViewer = new pdfjsViewer.PDFViewer({
        container: containerRef.current as HTMLDivElement,
        eventBus,
        linkService,
        l10n,
        useOnlyCssZoom: USE_ONLY_CSS_ZOOM,
        textLayerMode: TEXT_LAYER_MODE,
        removePageBorders: true
      });

      console.log('pdfViewer: ', pdfViewer);
      linkService.setViewer(pdfViewer);
      pdfHistory = new pdfjsViewer.PDFHistory({
        eventBus,
        linkService
      });
      linkService.setViewer(pdfHistory);

      eventBus.on('pagesinit', () => {
        pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
        // pdfViewer.currentScale = 'page-fit';
      });

      eventBus.on('pagechanging', (evt: any) => {
        const page = evt.pageNumber;
        console.log('page: ', page);
      });
    };

    const errorHandler = (message: string, moreInfo: any) => {
      const moreInfoText = [
        l10n?.get(
          'error_version_info',
          {
            version: pdfjsLib.version || '?',
            build: pdfjsLib.build || '?'
          } as any,
          'PDF.js v{{version}} (build: {{build}})'
        )
      ];
      if (moreInfo) {
        moreInfoText.push(
          l10n?.get(
            'error_message',
            { message: moreInfo.message } as any,
            'Message: {{message}}'
          )
        );
        if (moreInfo.stack) {
          moreInfoText.push(
            l10n?.get(
              'error_stack',
              { stack: moreInfo.stack } as any,
              'Stack: {{stack}}'
            )
          );
        } else {
          if (moreInfo.filename) {
            moreInfoText.push(
              l10n?.get(
                'error_file',
                { file: moreInfo.filename } as any,
                'File: {{file}}'
              )
            );
          }
          if (moreInfo.lineNumber) {
            moreInfoText.push(
              l10n?.get(
                'error_line',
                { line: moreInfo.lineNumber } as any,
                'Line: {{line}}'
              )
            );
          }
        }
      }
      setError(message);
      Promise.all(moreInfoText).then(function (parts) {
        setErrorMoreInfo(parts.join('\n'));
      });
    };

    // const getScale = (pdfWidth: number) => {
    //   const clientWidth = document.body.clientWidth;
    //   const currentScale = clientWidth / pdfWidth / PDF_TO_CSS_UNITS;
    //   console.log('currentScale: ', currentScale);
    //   return currentScale;
    // };

    const getDocument = async () => {
      try {
        const loadingMask = pdfjsLib.getDocument({
          url,
          maxImageSize: MAX_IMAGE_SIZE,
          cMapUrl: CMAP_URL,
          cMapPacked: CMAP_PACKED
        });
        pdfDocument = await loadingMask.promise;
        const page = await pdfDocument.getPage(1);
        // const currentScale = getScale(page._pageInfo.view[2]);
        setSize({
          width: page._pageInfo.view[2],
          height: page._pageInfo.view[3]
        });
        // pdfViewer.currentScale = currentScale;
        // setNumPages(pdfDocument.numPages);
        pdfViewer.setDocument(pdfDocument);
        pdfLinkService.setDocument(pdfDocument);
        pdfHistory.initialize({
          fingerprint: pdfDocument.fingerprint[0]
        });
      } catch (e: any) {
        const message = e && e.message;
        let loadingErrorMessage;
        if (e instanceof pdfjsLib.InvalidPDFException) {
          loadingErrorMessage = l10n?.get(
            'invalid_file_error',
            null,
            'Invalid or corrupted PDF file.'
          );
        } else if (e instanceof pdfjsLib.MissingPDFException) {
          loadingErrorMessage = l10n?.get(
            'missing_file_error',
            null,
            'Missing PDF file.'
          );
        } else if (e instanceof pdfjsLib.UnexpectedResponseException) {
          loadingErrorMessage = l10n?.get(
            'unexpected_response_error',
            null,
            'Unexpected server response.'
          );
        } else {
          loadingErrorMessage = l10n?.get(
            'loading_error',
            null,
            'An error occurred while loading the PDF.'
          );
        }
        if (loadingErrorMessage) {
          loadingErrorMessage.then(function (msg) {
            errorHandler(msg, { message });
          });
        }
      }
    };

    const zoomIn = (ticks: number) => {
      let newScale = pdfViewer.currentScale;
      do {
        newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
        newScale = Math.ceil(newScale * 10) / 10;
        newScale = Math.min(MAX_SCALE, newScale);
      } while (--ticks && newScale < MAX_SCALE);
      pdfViewer.currentScaleValue = newScale;
    };

    const zoomOut = (ticks: number) => {
      let newScale = pdfViewer.currentScale;
      do {
        newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
        newScale = Math.floor(newScale * 10) / 10;
        newScale = Math.max(MIN_SCALE, newScale);
      } while (--ticks && newScale > MIN_SCALE);
      pdfViewer.currentScaleValue = newScale;
    };

    useEffect(() => {
      initUI();
    }, []);

    useEffect(() => {
      if (url) {
        getDocument();
      }
    }, [url]);

    useEffect(() => {
      if (error || errorMoreInfo) {
        props?.onError?.(error, errorMoreInfo);
      }
    }, [error, errorMoreInfo]);

    useImperativeHandle(ref, () => ({
      zoomIn,
      zoomOut
    }));

    return (
      <div className={styles.container} ref={containerRef}>
        <div
          className={`pdf-viewer ${styles.viewer}`}
          style={{
            width: `calc(${size.width}px * var(--scale-factor))`,
            height: `calc(${size.height}px * var(--scale-factor))`
          }}
        />
      </div>
    );
  }
);

PdfViewers.displayName = 'PdfViewers';

export default PdfViewers;
```

### 方法二

```js
import { useEffect, useRef, useState, RefObject } from 'react';
import { PdfViewerProps } from './types';
import styles from './style/index.module.less';

const PdfViewers = (props: PdfViewerProps) => {
  const { url, style = {} } = props;
  const pdfRef: RefObject<HTMLCanvasElement[]> = useRef<HTMLCanvasElement[]>(
    []
  );
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale] = useState(1);
  const [containerStyle, setContainerStyle] = useState({});

  const getDocument = async (url: string) => {
    const loadingMask = window.pdfjsLib.getDocument(url);
    const pdfDocument = await loadingMask.promise;
    setPdfDocument(pdfDocument);
    setNumPages(pdfDocument.numPages);
    setPages([...Array(pdfDocument.numPages)].map((item, index) => index + 1));
  };

  const getPage = async (num: number) => {
    const page = await pdfDocument.getPage(num);
    const outputScale = window.devicePixelRatio || 1;
    const clientWidth = document.body.clientWidth;
    const viewport = page.getViewport({ scale: scale });
    const realScale = clientWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale: realScale });
    const allHeight =
      Math.floor(scaledViewport.height * outputScale) +
      Math.floor(scaledViewport.width * outputScale) -
      40 +
      'px';
    setContainerStyle({
      height: allHeight
    });
    const canvas = pdfRef.current?.[num];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = Math.floor(scaledViewport.width * outputScale);
      canvas.height = Math.floor(scaledViewport.height * outputScale);
      canvas.style.width = Math.floor(scaledViewport.width) + 'px';
      canvas.style.height = Math.floor(scaledViewport.height) + 'px';
      canvas.dataset.pagenumber = num.toString();
      canvas.dataset.scale = realScale.toString();
      const transform =
        outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
      const renderContext = {
        canvasContext: ctx,
        transform: transform,
        viewport: scaledViewport
      };
      page.render(renderContext);
      if (numPages > num) {
        getPage(num + 1);
      }
    }
  };

  useEffect(() => {
    if (window.pdfjsLib && url) {
      getDocument(url);
    }
  }, [url]);

  useEffect(() => {
    if (pdfDocument) {
      getPage(1);
    }
  }, [pdfDocument]);

  return (
    <div
      className={styles.container}
      style={{ ...containerStyle, ...style, marginTop: 40 }}>
      {pages.map((index) => {
        return (
          <canvas
            ref={(ref) => {
              if (pdfRef.current) {
                pdfRef.current[index] = ref as HTMLCanvasElement;
              }
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default PdfViewers;

```

```css
.container {
  width: 100%;
  height: fit-content;
  overflow-x: hidden;
  overflow-y: auto;
}

.viewer {
  margin: auto;
}

.pdf-viewer {
  &.removePageBorders {
    .page {
      margin-bottom: 0;
    }
  }
}
```