import { sequelize } from "../data/sequelize-init.js";
import { DataTypes } from "sequelize";
import {Curso} from "./curso.js"

//Va a contener la informacion de los materiales relacionados a los cursos
export const Material_Curso = sequelize.define(
  "Material_Curso",
  {
    Id_Material: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [10, 50],
          msg: "La descripción del material del curso debe tener entre 10 y 50 caracteres",
        },
        notNull: {
          msg: "Por favor ingrese la descripción del material del curso",
        },
      },
    },
    Tipo_Material: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: "El tipo de material del curso debe tener entre 1 y 50 caracteres",
        },
        notNull: {
          msg: "Por favor ingrese el tipo de material del curso",
        },
      },
    },
    URL: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [10, 100],
          msg: "La URL del material del curso debe tener entre 10 y 100 caracteres",
        },
        notNull: {
          msg: "Por favor ingrese la URL del material del curso",
        },
      },
    },
    Id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cursos",
        key: "Id_Curso",
      },
    },
  },
  {
    timestamps: false,
    modelName: "Material_Curso",
    tableName: "Material_Curso",
  }
);

Material_Curso.belongsTo(Curso, {foreignKey: "Id_Curso"})
Curso.hasMany(Material_Curso, {foreignKey: "Id_Curso"})