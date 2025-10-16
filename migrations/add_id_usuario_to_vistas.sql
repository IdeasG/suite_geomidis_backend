-- Script SQL para agregar el campo id_usuario a la tabla tadm_vistas
-- Ejecutar este script en la base de datos para actualizar la estructura

-- Agregar columna id_usuario a la tabla existente
ALTER TABLE administracion.tadm_vistas 
ADD COLUMN id_usuario INTEGER;

-- Agregar foreign key constraint (opcional)
ALTER TABLE administracion.tadm_vistas 
ADD CONSTRAINT fk_vistas_usuario 
FOREIGN KEY (id_usuario) REFERENCES seguridad.tg_usuario(id_usuario);

-- Crear índice para mejorar performance de consultas por usuario
CREATE INDEX idx_tadm_vistas_id_usuario ON administracion.tadm_vistas(id_usuario);

-- Comentario para documentar el cambio
COMMENT ON COLUMN administracion.tadm_vistas.id_usuario IS 'ID del usuario propietario de la vista';

-- (Opcional) Si quieres migrar vistas existentes a un usuario específico, puedes usar:
-- UPDATE administracion.tadm_vistas SET id_usuario = 1 WHERE id_usuario IS NULL;