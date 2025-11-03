export const notificacionRegistroManualTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acceso habilitado – Geoportal MIDIS</title>
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
    .highlight {
      background: #e8f1ff;
      color: #0d3c61;
      padding: 12px;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: bold;
      text-align: center;
      border: 1px solid #cce0ff;
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
    <div class="header">
      <img src="{{baseUrl}}/assets/images/geoportal-01.jpg" alt="Logo Geoportal MIDIS">
    </div>

    <div class="content">
      <h2>Acceso habilitado al Geoportal MIDIS</h2>

      <p>Estimado/a <strong>{{nombre}}</strong>,</p>

      <p>Le informamos que se ha habilitado su acceso al Geoportal MIDIS. A partir de este momento, puede iniciar sesión con las credenciales asignadas que se detallan a continuación</p>

      <div class="highlight">
        <p><strong>Datos de acceso:</strong></p>
        <p>Usuario: <strong>{{usuario}}</strong><br>
        Contraseña: <strong>{{contrasena}}</strong><br>
        Rol asignado: <strong>{{rol}}</strong></p>
      </div>

      <div class="button-container">
        <a href="{{baseUrl}}/" class="button" target="_blank">Ingresar al Geoportal</a>
      </div>

      <p>Le damos la bienvenida y le recordamos que este acceso le permitirá utilizar las funcionalidades correspondientes a su rol dentro del sistema.</p>

      <p>Si necesita asistencia, puede comunicarse con el equipo de soporte técnico.</p>
    </div>

    <div class="footer">
      <p>Este mensaje ha sido generado automáticamente por el <strong>Geoportal MIDIS</strong>.</p>
      <p>Para consultas o soporte técnico, comuníquese al teléfono: (01) 6318000 anexo 1718</p>
    </div>
  </div>
</body>
</html>
`;