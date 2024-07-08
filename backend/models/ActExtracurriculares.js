import { sequelize } from "../data/sequelize-init.js";
import { DataTypes } from "sequelize";
import { Profesor } from "./profesores.js";

//Va a contener la informacion de las actividades extracurriculares que se realizan en la institucion
export const Actividad_Extracurricular = sequelize.define(
  "Actividad_Extracurricular",
  {
    Id_Actividad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [10, 50],
          msg: "El nombre de la actividad extracurricular debe tener entre 10 y 50 caracteres",
        },
        notNull: {
          msg: "Por favor ingrese el nombre de la actividad extracurricular",
        },
      },
    },
    Descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [10, 100],
          msg: "La descripcion debe tener entre 10 y 100 caracteres",
        },
        notNull: {
          msg: "Por favor ingrese la descripcion de la actividad extracurricular",
        },
      },
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "Por favor ingrese una fecha valida",
        },
      },
    },
    Id_Profesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Profesores",
        key: "Id_Profesor",
      },
    },
  },
  {
    timestamps: false,
    modelName: "Actividad_Extracurricular",
    tableName: "Actividades_Extracurriculares",
  }
);

Actividad_Extracurricular.belongsTo(Profesor, {foreignKey: "Id_Profesor"})
Profesor.hasMany(Actividad_Extracurricular, {foreignKey: "Id_Profesor"})