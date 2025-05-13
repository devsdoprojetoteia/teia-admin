declare module 'pdf-image' {
  export class PDFImage {
    constructor(pdfFilePath: string)
    convertPage(pageNumber: number): Promise<string>
  }
} 