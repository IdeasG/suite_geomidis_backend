export const notificacionUsuarioAprobadoTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acceso aprobado – Geoportal MIDIS</title>
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
      <h2>Acceso aprobado al Geoportal MIDIS</h2>

      <p>Estimado/a <strong>{{nombre}}</strong>,</p>

      <p>Nos complace informarle que su <strong>solicitud de registro en el Geoportal MIDIS</strong> ha sido aprobada exitosamente. Ya puede acceder al sistema utilizando las credenciales asignadas.</p>

      <div class="highlight">
        <p><strong>Datos de acceso:</strong></p>
  <p>Usuario: <strong>{{usuario}}</strong><br>
        Contraseña: <strong>la usada al registrarse</strong><br>
        <!-- Rol asignado: <strong>{{rol}}</strong></p></p> -->
      </div>

      <div class="button-container">
        <a href="{{baseUrl}}/" class="button" target="_blank">Ingresar al Geoportal</a>
      </div>

      <p>Si presenta algún inconveniente al ingresar, puede comunicarse con el equipo de soporte técnico.</p>
    </div>

    <div class="footer">
      <p>Este mensaje ha sido generado automáticamente por el <strong>Geoportal MIDIS</strong>.</p>
      <p>Para consultas o soporte técnico, escriba a: <a href="mailto:soporte@geoportal.midis.gob.pe">soporte@geoportal.midis.gob.pe</a></p>
    </div>
  </div>
</body>
</html>
`;