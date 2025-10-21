export const notificacionSolicitudAdminTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva solicitud de registro – Geoportal MIDIS</title>
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
      <h2>Nueva solicitud de registro en el Geoportal MIDIS</h2>

      <p>Estimados administradores,</p>
      <p>Se ha recibido una nueva <strong>solicitud de registro de usuario</strong> en el <strong>Geoportal MIDIS</strong>. Es necesario que uno de los administradores revise la información y proceda con la aprobación o rechazo de la solicitud conforme a los procedimientos establecidos.</p>

      <div class="highlight">
        Acción requerida: Revisar y admitir la solicitud registrada en el sistema.
      </div>

      <p><strong>Datos del solicitante:</strong></p>
      <ul>
        <li><strong>Nombre completo:</strong> {{nombres}} {{apellidos}}</li>
        <li><strong>Correo electrónico:</strong> {{correo}}</li>
        <li><strong>Institución:</strong> {{institucion}}</li>
        <li><strong>Cargo:</strong> {{cargo}}</li>
      </ul>

      <p>Por favor, ingrese al panel de administración para gestionar la solicitud. Una vez completado el proceso, el sistema notificará automáticamente al usuario solicitante sobre el resultado de su registro.</p>
      
    </div>

    <div class="footer">
      <p>Este mensaje ha sido generado automáticamente por el <strong>Geoportal MIDIS</strong>.</p>
      <p>Para consultas o soporte técnico, comuníquese a: <a href="mailto:soporte@geoportal.midis.gob.pe">soporte@geoportal.midis.gob.pe</a></p>
    </div>
  </div>
</body>
</html>
`;