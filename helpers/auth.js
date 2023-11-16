import "dotenv/config";
import jwt from "jsonwebtoken";

export function generarToken(usuario, expiredIn = "1d") {
  const payload = {
    id: usuario.id_usuario,
    id_cliente: usuario.id_cliente,
  };

  const opciones = {
    expiresIn: expiredIn,
  };

  const opcionesRefresh = {
    expiresIn: "7d",
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, opciones);
  const refresToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_TOKEN_KEY,
    opcionesRefresh
  );
  const tokenDecoded = jwt.decode(accessToken);
  const expiracionToken = tokenDecoded.exp;
  return { accessToken, refresToken, expiracionToken };
}

export function refreshTokenUser(usuario, expiredIn = "7d") {
  const payload = {
    id: usuario.id_usuario,
    id_cliente: usuario.id_cliente,
  };

  const opciones = {
    expiresIn: expiredIn,
  };

  const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, opciones);

  return token;
}
