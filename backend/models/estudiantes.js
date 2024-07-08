import { DataTypes } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";

//Almacena la informacion de los estudiantes.
export const Estudiante = sequelize.define(
  "Estudiantes",
  {
    Id_Estudiante: {
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
          args: [3, 60],
          msg: "El campo Nombre debe tener entre 3 y 60 caracteres",
        },
      },
    },
    Apellido: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo Apellido no puede estar vacío",
        },
        len: {
          args: [3, 40],
          msg: "El campo Apellido debe tener entre 3 y 40 caracteres",
        },
      },
    },
    Fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "El campo Fecha de nacimiento debe ser una fecha valida",
        },
        /* isBefore: {
            args: new Date().toISOString().split('T')[0],
            msg: "La fecha de nacimiento no puede ser mayor a la fecha actual"
        } */
        isValidateDate(value) {
          if (new Date(value) > new Date()) {
            throw new Error(
              "La fecha de nacimiento no puede ser mayor a la fecha actual"
            );
          }
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          if (age < 0 || age > 120) {
            throw new Error(
              "La fecha de nacimiento no puede ser mayor a la fecha actual"
            );
          }
        },
      },
    },
    Direccion: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    Telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "El campo Email debe ser un correo válido",
        },
      },
    },
  },
  {
    timestamps: false,
    modelName: "Estudiantes",
    tableName: "Estudiantes",
  }
);
