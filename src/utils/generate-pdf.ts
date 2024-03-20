import puppeteer, { PaperFormat } from "puppeteer";
import path from "path";
import * as hbs from "handlebars";
import * as fs from "fs-extra";

const compile = async function (templateName: any, data: any) {
  console.log("3. inside compile fetching index.hbs");
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
  console.log("filepath", filePath);
  try {
    const html = await fs.readFile(filePath, "utf-8");
    console.log("return compile 3.");
    return hbs.compile(html)(data);
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

export const generatePdf = async (data: any) => {
  console.log("2. inside generatePdf function");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
  });
  const page = await browser.newPage();

  const content = await compile("index", data);
  await page.setContent(content, { waitUntil: "domcontentloaded" });
  const options = {
    format: "A4" as PaperFormat,
    path: `./pdf/invoice_${data["invoiceNumber"]}.pdf`,
    printBackground: true,
  };
  try {
    console.log("return generatepdf 2.");
    return await page.pdf(options);
  } catch (err) {
    console.log("return generatepdf 2. error");
    console.error("Error generating PDF:", err);
    throw err;
  } finally {
    await browser.close();
  }
};
