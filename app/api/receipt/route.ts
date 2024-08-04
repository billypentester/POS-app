import { NextResponse } from 'next/server';
const {executablePath} = require('puppeteer')
const chromium = require("@sparticuz/chromium");

export async function POST(req: Request) {
  
    try {

        // get request body
        const data = await req.json();

        console.log(data)

        const puppeteer = await import("puppeteer-core");

        const browser = await puppeteer.launch({
          executablePath: executablePath(),
      });

        const page = await browser.newPage();
    
        const htmlContent = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; }
                h1 { color: #333; }
              </style>
            </head>
            <body>
              <h1>Hello, PDF World!</h1>
            </body>
          </html>
        `;
    
        await page.setContent(htmlContent);

        const pdf: Buffer = await page.pdf({
            format: "a4",
            printBackground: true,
        });
        
        console.log("PDF generated"); // Debugging log

        for (const page of await browser.pages()) {
            await page.close();
        }

        // Close the Puppeteer browser
        await browser.close();
        console.log("Browser closed"); // Debugging log

        // Create a Blob from the PDF data
        const pdfBlob = new Blob([pdf], { type: "application/pdf" });

        const response = new NextResponse(pdfBlob, {
          headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": "inline; filename=invoice.pdf",
          },
          status: 200,
      });

      return response;

        // Response.setHeader('Content-Type', 'application/pdf');
        // Response.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
        // Response.send(pdfBuffer);
    
      } 
      catch (error) {
        console.log('Error: ', error);
        return Response.json("Error generating PDF");
      }

}

