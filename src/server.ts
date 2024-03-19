import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import ClientRoute from "./routes/client.route";
import PdfRoute from "./routes/pdfmake.routes";
import TwilioRoute from "./routes/twilio.routes";
import BusinessRoute from "./routes/business.route";
import BankingRoute from "./routes/banking.route";
import ItemRoute from "./routes/items.route";
import InvoiceRoute from "./routes/invoice.route";
import IndustryRoute from "./routes/industry.routes";
import TaxRoute from "./routes/tax.routes";
import StatesRoute from "./routes/states.routes";
import { auth } from "express-oauth2-jwt-bearer";
import { settings } from "./config/settings";
import CountriesRoute from "./routes/countries.routes";
import CitiesRoute from "./routes/cities.routes";
import AddressRoute from "./routes/address.routes";

const app: Express = express();

const PORT = settings.port || 8000;

const jwtCheck = auth({
  audience: settings.authCredentials.audience,
  issuerBaseURL: settings.authCredentials.issuerBaseURL,
  tokenSigningAlg: "RS256",
});

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use("/api/images", express.static("templates"));
app.use(jwtCheck);

app.use(
  "/api/pdf",
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  }),
  PdfRoute
);
app.use("/api/message", TwilioRoute);
app.use("/api/tax", TaxRoute);
app.use("/api/address", AddressRoute);
app.use("/api/countries", CountriesRoute);
app.use("/api/states", StatesRoute);
app.use("/api/cities", CitiesRoute);
app.use("/api/client", ClientRoute);
app.use("/api/business", BusinessRoute);
app.use("/api/banking", BankingRoute);
app.use("/api/item", ItemRoute);
app.use("/api/invoice", InvoiceRoute);
app.use("/api/industry", IndustryRoute);

app.get("/", function (req, res) {
  res.send("Hello 👋");
});

app.listen(PORT, () => {
  console.log(`server is live on port ${PORT}.`);
});
