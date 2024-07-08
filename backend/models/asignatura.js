import { DataTypes } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";

//Almacena la informacion sobre los cursos. 
export const Asignatura = sequelize.define(
  "Asignaturas",
  {
    Id_Asignatura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo Nombre no puede estar vacío",
        },
        len: {
          args: [5, 60],
          msg: "El campo Nombre debe tener entre 5 y 60 caracteres",
        },
      },
    },
    Descripcion: {
      type: DataTypes.STRING(60),
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo Descripcion no puede estar vacío",
        },
        len: {
          args: [5, 60],
          msg: "El campo Descripcion debe tener menos de 60 caracteres y mas de 5 caracteres",
        },
      },
    },
  },
  {
    timestamps: false,
    modelName: "Asignaturas",
    tableName: "Asignaturas",
  }
);
