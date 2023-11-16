import "dotenv/config";

import jwt from "jsonwebtoken";

export function validarToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Formato de token inválido" });
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      id: decoded.id,
      id_cliente: decoded.id_cliente,
    };
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
}

export function validarRefreshToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }
  if (!authHeader.startsWith("Refresh ")) {
    return res.status(401).json({ mensaje: "Formato de token inválido" });
  }
  const token = authHeader.substring(8);
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_KEY);
    req.user = {
      id: decoded.id,
      id_cliente: decoded.id_cliente,
    };
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido", error });
  }
}
