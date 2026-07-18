"use client";

import React, { useEffect, useRef, useState } from "react";

export function PDFViewer({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    let pdfDoc: any = null;
    let resizeTimeout: NodeJS.Timeout;

    // Check if window is defined (for SSR safety)
    if (typeof window === "undefined") return;

    const renderPages = async (pdf: any) => {
      const container = containerRef.current;
      if (!container) return;
      container.innerHTML = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        if (!isMounted) break;
        
        try {
          const page = await pdf.getPage(pageNum);
          
          // Create a container wrapper for the canvas with shadows & spacing
          const pageWrapper = document.createElement("div");
          pageWrapper.className = "relative mb-6 last:mb-0 shadow-md bg-white border border-line rounded-lg overflow-hidden w-full flex justify-center";
          
          const canvas = document.createElement("canvas");
          canvas.className = "block max-w-full";
          pageWrapper.appendChild(canvas);
          container.appendChild(pageWrapper);

          const context = canvas.getContext("2d");
          if (!context) continue;

          // Render at high resolution (devicePixelRatio) for crisp text, then scale down using CSS
          const dpr = window.devicePixelRatio || 1;
          const containerStyle = window.getComputedStyle(container);
          const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
          const paddingRight = parseFloat(containerStyle.paddingRight) || 0;
          const targetWidth = container.clientWidth - (paddingLeft + paddingRight);
          const initialViewport = page.getViewport({ scale: 1 });
          const scale = targetWidth / initialViewport.width;
          const viewport = page.getViewport({ scale: scale * dpr });

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          // Set display size via CSS style
          canvas.style.width = `${viewport.width / dpr}px`;
          canvas.style.height = `${viewport.height / dpr}px`;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          
          await page.render(renderContext).promise;
        } catch (renderError) {
          console.error(`Error rendering page ${pageNum}:`, renderError);
        }
      }
    };

    const loadPdfJS = async () => {
      try {
        // Load PDF.js script dynamically if not already present
        if (!(window as any).pdfjsLib) {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.async = true;
          document.head.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error("Failed to load PDF library script."));
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        // Configure PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        // Fetch & load the document
        const loadingTask = pdfjsLib.getDocument(url);
        pdfDoc = await loadingTask.promise;
        
        if (!isMounted) return;
        setNumPages(pdfDoc.numPages);
        setLoading(false);

        // Perform initial rendering
        await renderPages(pdfDoc);

        // Handle viewport resize with a debounce to redraw canvasses cleanly
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (isMounted && pdfDoc) {
              renderPages(pdfDoc).catch(console.error);
            }
          }, 300);
        };

        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (err: any) {
        console.error("PDF loading error:", err);
        if (isMounted) {
          setError(err.message || "Failed to load PDF document");
          setLoading(false);
        }
      }
    };

    loadPdfJS();

    return () => {
      isMounted = false;
      clearTimeout(resizeTimeout);
    };
  }, [url]);

  return (
    <div className="w-full flex flex-col">
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-ink/60">
          <div className="w-8 h-8 border-2 border-ember border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium">Loading rulebook preview...</p>
        </div>
      )}
      
      {error && (
        <div className="w-full p-6 text-center border border-red-500/20 bg-red-500/5 rounded-xl">
          <p className="text-red-400 font-medium mb-2">Unable to preview PDF directly</p>
          <p className="text-greige text-xs mb-4">Please download the document or use the link below to view it.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-ember px-4 py-2 text-sm font-semibold text-white hover:bg-ember/90 transition-colors"
          >
            Open PDF in new tab
          </a>
        </div>
      )}

      {/* Render container (hidden until loaded, scrollable) */}
      <div 
        ref={containerRef} 
        className={`w-full max-h-[75vh] overflow-y-auto rounded-none sm:rounded-xl bg-onyx-95/40 p-1 sm:p-4 border-y sm:border border-line ${
          loading || error ? "hidden" : "block"
        }`}
        style={{ WebkitOverflowScrolling: "touch" }}
      />
      
      {!loading && !error && numPages > 0 && (
        <div className="mt-3 flex items-center justify-between text-xs text-greige px-1">
          <span>{numPages} pages loaded</span>
          <span>Scroll inside the preview to read</span>
        </div>
      )}
    </div>
  );
}
