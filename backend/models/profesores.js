import { DataTypes } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";

//Almacena la informacion de los profesores.
export const Profesor = sequelize.define(
  "Profesores",
  {
    Id_Profesor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
          msg: "El campo apellido no puede estar vacio",
        },
        len: {
          args: [3, 40],
          msg: "El campo apellido debe tener entre 3 y 40 caracteres",
        },
      },
    },
    Fecha_Nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo Fecha de Nacimiento no puede estar vacío",
        },
        isDate: {
          args: true,
          msg: "El campo Fecha de Nacimiento debe ser una fecha",
        },
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
    Especialidad: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo espcialidad no puede quedar vacio",
        },
      },
    },
    Telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El campo telefono no puede quedar vacio",
        },
      },
    },
    Email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "El campo email debe ser un correo valido",
        },
      },
    },
  },
  {
    timestamps: false,
    modelName: "Profesores",
    tableName: "Profesores",
  }
);
