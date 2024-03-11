import express, { Express } from "express";
import cors from "cors";
import ClientRoute from "./routes/client.route";
import PdfRoute from "./routes/pdfmake.routes";
import TwilioRoute from "./routes/twilio.routes";
import BusinessRoute from "./routes/business.route";
import BankingRoute from "./routes/banking.route";
import ItemRoute from "./routes/items.route";
import InvoiceRoute from "./routes/invoice.route";
import TaxRoute from "./routes/tax.routes";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { settings } from "./config/settings";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8000;

const jwtCheck = auth({
  audience: settings.authCredentials.audience,
  issuerBaseURL: settings.authCredentials.issuerBaseURL,
  tokenSigningAlg: "RS256",
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/images", express.static("templates"));
app.use(jwtCheck);
app.use("/api/pdf", PdfRoute);
app.use("/api/message", TwilioRoute);
app.use("/api/tax", TaxRoute);
app.use("/api/client", ClientRoute);
app.use("/api/business", BusinessRoute);
app.use("/api/banking", BankingRoute);
app.use("/api/item", ItemRoute);
app.use("/api/invoice", InvoiceRoute);

app.get("/", function (req, res) {
  res.send("Hello 👋");
});

app.listen(PORT, () => {
  console.log(`server is live on port ${PORT}.`);
});
