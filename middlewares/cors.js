import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  // "https://suite.juegodepalabras.com.pe",
  // "https://suite-nextjs.vercel.app",
  "https://geomidis.ideasg.org",
  "https://suite-geomidis-nextjs.vercel.app",
  // "https://glgissuite.ideasg.org",
  // "https://www.glgissuite.ideasg.org",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });
