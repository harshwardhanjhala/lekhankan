import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractPDFText(file) {

  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  let fullText = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

    const page = await pdf.getPage(pageNumber);

    const content = await page.getTextContent();

    // Sort by vertical position (top → bottom)
    const items = [...content.items].sort(
      (a, b) => b.transform[5] - a.transform[5]
    );

    let currentY = null;
    let currentLine = [];

    for (const item of items) {

      const y = item.transform[5];

      if (
        currentY !== null &&
        Math.abs(currentY - y) > 2
      ) {

        fullText += currentLine.join(" ") + "\n";

        currentLine = [];
      }

      currentLine.push(item.str);

      currentY = y;
    }

    if (currentLine.length) {

      fullText += currentLine.join(" ") + "\n";

    }

    fullText += "\n";
  }

  return fullText;

}