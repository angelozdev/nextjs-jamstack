import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const PREFERRED_LOCALE_COOKIE = "NEXT_LOCALE";
const DEFAULT_LOCALE: Locales = "es";
const DAY_IN_SECONDS = 60 * 24 * 60;

const getMethod: NextApiHandler = (req, res) => {
  const preferredLocale = req.cookies[PREFERRED_LOCALE_COOKIE] || "";

  res.status(200).json({
    preferredLocale,
    defaultLocale: DEFAULT_LOCALE,
  });
};

const postMethod: NextApiHandler = (req, res) => {
  const newLocale = req.body?.locale;

  if (!newLocale || typeof newLocale !== "string") {
    return res.status(404).json({ message: "Invalid locale" });
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(PREFERRED_LOCALE_COOKIE, newLocale, {
      path: "/",
      maxAge: DAY_IN_SECONDS,
      expires: new Date(Date.now() + DAY_IN_SECONDS),
    })
  );

  return res.end();
};

function language(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method || "GET";

  switch (method) {
    case "GET":
      return getMethod(req, res);
    case "POST":
      return postMethod(req, res);
  }

  res.status(405).json({ message: "Invalid method" });
}

export default language;
