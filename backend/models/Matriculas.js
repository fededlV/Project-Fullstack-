import { sequelize } from "../data/sequelize-init.js";
import { DataTypes } from "sequelize";

//Va a contener la informacion de las matriculas de los estudiantes en los cursos.
export const Matricula = sequelize.define(
  "Matricula",
  {
    Id_Matricula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Fecha_Matricula: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Id_Estudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Estudiantes",
        key: "Id_Estudiante",
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
    modelName: "Matricula",
    tableName: "Matriculas",
  }
);
