import puppeteer, { PaperFormat } from "puppeteer";
import path from "path";
import * as hbs from "handlebars";
import * as fs from "fs-extra";

const compile = async function (templateName: any, data: any) {
  console.log("3. inside compile fetching index.hbs");
  const filePath = path.join(
    process.cwd(),
    "..",
    "templates",
    `${templateName}.hbs`
  );
  console.log("filepath", filePath);
  try {
    const html = await fs.readFile(filePath, "utf-8");
    return hbs.compile(html)(data);
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

export const generatePdf = async (data: any) => {
  console.log("2. inside generatePdf function---called generatePdf");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
  });
  const page = await browser.newPage();

  const content = await compile("index", data);
  await page.setContent(content, { waitUntil: "domcontentloaded" });
  const pdfFolderDir = path.join(
    process.cwd(),
    "..",
    "files",
    `invoice_${data["invoiceNumber"]}.pdf`
  );
  console.log({ pdfFolderDir });
  const options = {
    format: "A4" as PaperFormat,
    path: pdfFolderDir,
    printBackground: true,
  };
  try {
    console.log("return generatepdf 2.--calling try");
    const buffer = await page.pdf(options);
    console.log("Buffer response", { buffer });
    return buffer;
  } catch (err) {
    console.log("error generatePdf 2--calling error", { err });
    throw err;
  } finally {
    await browser.close();
  }
};
