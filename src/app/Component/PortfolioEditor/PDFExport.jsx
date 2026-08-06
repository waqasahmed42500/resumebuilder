'use client';

// Imports are done dynamically inside the function to avoid SSR issues

export const exportPortfolioPDF = async (elementRef) => {
  if (!elementRef || !elementRef.current) return;
  
  const el = elementRef.current;
  const prevZoom = el.style.zoom;
  const prevWidth = el.style.width;
  const prevMinWidth = el.style.minWidth;
  const prevOverflow = el.style.overflow;
  
  try {
    // Force full A4 size — override any CSS zoom so html2canvas captures at 100%
    el.style.zoom = "1";
    el.style.width = "794px";    // A4 width in px at 96dpi
    el.style.minWidth = "794px";
    el.style.overflow = "visible";

    // Small delay for browser to repaint at new size
    await new Promise((r) => setTimeout(r, 120));

    // Dynamically import libraries to avoid SSR errors when this file is loaded
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const canvas = await html2canvas(el, { 
      scale: 2, 
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: el.scrollWidth,
      height: el.scrollHeight,
      windowWidth: el.scrollWidth,
    });
    
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Multi-page: slice canvas into A4-height chunks
    const pageHeightPx = (canvas.width * pageHeight) / pageWidth; // page height in canvas pixels
    let yOffset = 0;
    let pageIndex = 0;

    while (yOffset < canvas.height) {
      if (pageIndex > 0) pdf.addPage();

      const sliceHeight = Math.min(pageHeightPx, canvas.height - yOffset);

      // Create a temp canvas for this slice
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeight;
      const ctx = sliceCanvas.getContext("2d");
      ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

      const sliceData = sliceCanvas.toDataURL("image/png");
      const sliceHeightPt = (sliceHeight * pageWidth) / canvas.width;
      pdf.addImage(sliceData, "PNG", 0, 0, pageWidth, sliceHeightPt, undefined, "FAST");

      yOffset += pageHeightPx;
      pageIndex++;
    }

    pdf.save('portfolio.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Restore original styles
    el.style.zoom = prevZoom;
    el.style.width = prevWidth;
    el.style.minWidth = prevMinWidth;
    el.style.overflow = prevOverflow;
  }
};

export default function PDFExport() {
  // This is a utility file, but we export a dummy component to satisfy the request to create a .jsx component file
  return null;
}
