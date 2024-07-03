import { useEffect, useRef } from "react";
import "pspdfkit";

let PSPDFKit, instance;

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
 

  useEffect(() => {
    const container = containerRef.current;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

      const defaultToolbarItems = PSPDFKit.defaultDocumentEditorToolbarItems;

      // Insert custom item at the desired position
      const toolbarItems = [...defaultToolbarItems];

      instance = await PSPDFKit.load({
        licenseKey: "Your License Key Goes Here",
        container,
        document: props.document,
        baseUrl: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.PUBLIC_URL ?? ""
        }`,
        documentEditorToolbarItems: toolbarItems,
      });

      let isProcessingPaste = false;

      const handlePaste = async (event) => {
        if (isProcessingPaste) return;
        isProcessingPaste = true;

        try {
          const items = (event.clipboardData || event.originalEvent.clipboardData).items;
          const item = items[0]; // this will get only the last copied data from clipboard

          const content_Type = item.type;
          const currentPage = instance.viewState.currentPageIndex;

          if (item.kind === 'file' && item.type.startsWith('image')) {
            const file = item.getAsFile();
            const imageAttachmentId = await instance.createAttachment(file);
            const annotation = new PSPDFKit.Annotations.ImageAnnotation({
              pageIndex: currentPage,
              contentType: content_Type,
              imageAttachmentId,
              description: "Pasted Image Annotation",
              boundingBox: new PSPDFKit.Geometry.Rect({
                left: 10,
                top: 50,
                width: 150,
                height: 150
              })
            });
            await instance.create(annotation);

          } else if (item.kind === 'string') {
            item.getAsString(async (pastedText) => {
              // Here you can create a text annotation if needed
              const textAnnotation = new PSPDFKit.Annotations.TextAnnotation({
                pageIndex: currentPage,
                text: {
                  format: "plain",
                  value: pastedText
                },
                boundingBox: new PSPDFKit.Geometry.Rect({
                  left: 10,
                  top: 50,
                  width: 150,
                  height: 50
                })
              });
              await instance.create(textAnnotation);
            });
          } else {
            console.log("Unsupported clipboard item");
          }
        } finally {
          isProcessingPaste = false;
        }
      };

      document.addEventListener('paste', handlePaste);
    

      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener('paste', handlePaste);
        PSPDFKit.unload(container);
      };
    })();
  }, [props.document]);

  useEffect(() => {
    if (props.handleAnnotation === "get") {
      const fetchAnnotationCoordinates = async () => {
        const annotations = await instance.getAnnotations(0); // Assuming pageIndex is 0
        let i =0;
        annotations.forEach(async (annotation) => {
          i=i+1;
          const { bottom, left, right, top } = annotation.boundingBox;
          const width = right - left;
          const height = bottom - top;
          console.log("Bottom: ",bottom," Left: ",left, " Right: ", right," Width: ", width," Height: ", height);
          console.log("Annotation", i, "Bounding Box: ",annotation.boundingBox);
        });
      };
      fetchAnnotationCoordinates();
    }
  }, [props.handleAnnotation]);


  return(<div ref={containerRef} style={{ width: "100%", height: "100vh" }} />);
}