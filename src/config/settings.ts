import dotenv from "dotenv";
dotenv.config();

export type Settings = {
  twilioCredentials: {
    authToken: string;
    accountSid: string;
  };
  awsCredentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  authCredentials: {
    audience: string;
    issuerBaseURL: string;
  };
};

const {
  ACCOUNT_SID,
  AUTH_TOKEN,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  ISSUR_BASE_URL,
  AUDIENCE,
} = process.env;

if (!ACCOUNT_SID || !AUTH_TOKEN) {
  throw Error("Missing twilio credentials.");
}

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw Error("Missing AWS credentials.");
}

if (!AUDIENCE || !ISSUR_BASE_URL) {
  throw Error("Missing Auth0 credentials.");
}

export const settings: Settings = {
  twilioCredentials: {
    authToken: AUTH_TOKEN,
    accountSid: ACCOUNT_SID,
  },
  awsCredentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  authCredentials: {
    audience: AUDIENCE,
    issuerBaseURL: ISSUR_BASE_URL,
  },
};
