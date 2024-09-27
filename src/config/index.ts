interface Config {
  backOfficeApiUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

export const config: Config = {
  backOfficeApiUrl: process.env.NEXT_PUBLIC_BACK_OFFICE_API_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
