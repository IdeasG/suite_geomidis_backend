import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "https://geoportal.midis.gob.pe",
  "https://geomidis23.ideasg.org"
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => (req, res, next) => {
  if (req.path.startsWith('/socket.io/')) {
    // Permitir cualquier origen para WebSocket de express-status-monitor
    cors({ origin: true })(req, res, next);
  } else {
    cors({
      origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin) || !origin) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
    })(req, res, next);
  }
};