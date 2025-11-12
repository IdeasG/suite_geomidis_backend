export const notificacionRecuperarPasswordTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperación de contraseña – Geoportal MIDIS</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f4f4f4;
      padding: 20px;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
      background: #fff;
      padding: 0;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      text-align: center;
      background-color: #ffffff;
    }
    .header img {
      width: 100%;
      height: auto;
      display: block;
    }
    .content {
      padding: 30px;
    }
    h2 {
      color: #0056b3;
      text-align: center;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      background-color: #0056b3;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 6px;
      font-weight: bold;
      display: inline-block;
    }
    .button:hover {
      background-color: #003f87;
    }
    .link-alt {
      text-align: center;
      font-size: 0.9em;
      margin-top: 10px;
      word-break: break-all;
    }
    .note {
      background: #f8f9fa;
      color: #555;
      padding: 12px;
      border-radius: 6px;
      margin-top: 25px;
      font-size: 0.9em;
      border: 1px solid #e0e0e0;
    }
    .footer {
      background: #f9f9f9;
      padding: 20px;
      font-size: 0.9em;
      color: #666;
      text-align: center;
      border-top: 1px solid #eee;
    }
    a {
      color: #0056b3;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h2>Recuperación de contraseña</h2>

      <p>Estimado/a <strong>{{nombre}}</strong>,</p>

      <p>Se ha recibido una solicitud para restablecer la contraseña de su cuenta en el <strong>Geoportal MIDIS</strong>. Si usted realizó esta solicitud, por favor haga clic en el siguiente botón para crear una nueva contraseña:</p>

      <div class="button-container">
        <a href="{{enlace_recuperacion}}" class="button" target="_blank">Restablecer contraseña</a>
      </div>

      <div class="link-alt">
        Si el botón no funciona, copie y pegue el siguiente enlace en su navegador:<br>
        <a href="{{enlace_recuperacion}}" target="_blank">{{enlace_recuperacion}}</a>
      </div>

      <div class="note">
        Si usted <strong>no solicitó</strong> el restablecimiento de contraseña, puede ignorar este mensaje. Su cuenta permanecerá segura.
      </div>
    </div>

    <div class="footer">
      <p>Este mensaje ha sido generado automáticamente por el <strong>Geoportal MIDIS</strong>.</p>
      <p>Para consultas o soporte técnico, comuníquese al teléfono: (01) 6318000 anexo 1718</p>
    </div>
  </div>
</body>
</html>
`;