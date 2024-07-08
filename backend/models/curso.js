import { DataTypes } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";

//Almacena la informacion sobre los cursos. 
export const Curso = sequelize.define(
  "Cursos",
  {
    Id_Curso: {
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
          msg: "El Nombre no puede estar vacío",
        },
        len: {
          args: [5, 60],
          msg: "El Nombre debe tener entre 5 y 60 caracteres",
        },
      },
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Fecha_Inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "El campo Fecha de inicio debe ser una fecha válida",
        },
        isAfter: {
          //Validamos que la fecha de inicio sea posterior a la fecha actual
          args: new Date().toISOString().split("T")[0],
          msg: "La fecha de inicio debe ser posterior a la fecha actual",
        },
      },
    },
    Fecha_Fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "El campo Fecha de fin debe ser una fecha válida",
        },
        isAfter(value) {
          //Validamos que la fecha de fin sea posterior a la fecha de inicio
          if (new Date(value) <= new Date(this.Fecha_Inicio)) {
            throw new Error(
              "La fecha de fin debe ser posterior a la fecha de inicio"
            );
          }
        },
      },
    },
  },
  {
    timestamps: false,
    modelName: "Cursos",
    tableName: "Cursos",
  }
);
