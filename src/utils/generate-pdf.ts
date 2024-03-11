import puppeteer, { PaperFormat } from "puppeteer";
import path from "path";
import * as hbs from "handlebars";
import * as fs from "fs-extra";

const compile = async function (templateName: any, data: any) {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);

  try {
    const html = await fs.readFile(filePath, "utf-8");
    return hbs.compile(html)(data);
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

export const generatePdf = async (data: any) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const content = await compile("index", data);
  await page.setContent(content, { waitUntil: "domcontentloaded" });
  const options = {
    format: "A4" as PaperFormat,
    path: `./pdf/invoice_${data["invoiceNumber"]}.pdf`,
    printBackground: true,
  };
  try {
    return await page.pdf(options);
  } catch (err) {
    console.error("Error generating PDF:", err);
    throw err;
  } finally {
    await browser.close();
  }
};
