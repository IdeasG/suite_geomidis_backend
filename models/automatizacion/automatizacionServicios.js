import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const AutomatizacionServicios = sequelize.define(
  "automatizacion_servicios",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    programa: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    capa: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    tipo_frecuencia: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [['D', 'M', 'A']] // D=Diario, M=Mensual, A=Anual
      }
    },
    dias_frecuencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_ultima_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_proxima_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_modificacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    schema: "automatizacion",
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
    indexes: [
      {
        unique: true,
        fields: ['programa', 'capa'],
        name: 'uq_programa_capa'
      },
      {
        fields: ['fecha_proxima_actualizacion']
      },
      {
        fields: ['activo']
      }
    ]
  }
);

export default AutomatizacionServicios;
