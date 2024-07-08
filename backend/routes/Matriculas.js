import express from "express";
import { Matricula } from "../models/Matriculas.js";
import { Op } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/matriculas/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todas las matriculas y obtener matricula por nombre de estudiante
router.get("/matriculas", async (req, res) => {
  try {
    const nombre = req.query.nombre;
    if (nombre) {
      // Buscar el ID del estudiante por su nombre
      const queryEstudiante =
        "SELECT Id_Estudiante FROM Estudiantes WHERE Nombre = :nombre";
      const estudiante = await sequelize.query(queryEstudiante, {
        replacements: { nombre: nombre },
        type: sequelize.QueryTypes.SELECT,
      });

      if (estudiante.length === 0) {
        return res.status(404).json({ mensaje: "Estudiante no encontrado" });
      }

      // Usar el ID del estudiante para buscar su matricula y nombre
      const queryMatricula = `
        SELECT 
          Matriculas.*, 
          Estudiantes.Nombre AS NombreEstudiante, Estudiantes.Apellido AS ApellidoEstudiante 
        FROM 
          Matriculas 
        JOIN 
          Estudiantes ON Matriculas.Id_Estudiante = Estudiantes.Id_Estudiante 
        WHERE 
          Matriculas.Id_Estudiante = :idEstudiante
        `;

      const matriculas = await sequelize.query(queryMatricula, {
        replacements: { idEstudiante: estudiante[0].Id_Estudiante },
        type: sequelize.QueryTypes.SELECT,
      });

      if (matriculas.length === 0) {
        return res.status(404).json({ mensaje: "Matricula no encontrada" });
      }

      // Devolver la matricula encontrada junto con el nombre del estudiante
      return res.status(200).json(matriculas);
    } else {
      // Obtener todas las matriculas si el nombre no es proporcionado
      const matriculas = await Matricula.findAll();
      return res.status(200).json(matriculas);
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener una matricula por Id.
router.get("/matriculas/:id", async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    if (matricula) {
      return res.status(200).json(matricula);
    } else {
      return res.status(404).json({
        message: "No se encontró la matricula del estudiante indicado.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Crear una nueva matricula.
router.post("/matriculas", async (req, res) => {
  try {
    const existeMatricula = await Matricula.findOne({
      where: {
        [Op.and]: [
          { Fecha_Matricula: req.body.Fecha_Matricula },
          { Id_Estudiante: req.body.Id_Estudiante },
          { Id_Curso: req.body.Id_Curso },
        ],
      },
    });
    if (existeMatricula) {
      return res.status(400).json({ message: "La matricula ya existe" });
    }
    const newMatricula = await Matricula.create(req.body);
    if (newMatricula) {
      return res.status(200).json(newMatricula);
    } else {
      return res.status(400).json({ message: "No se pudo crear la matricula" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Actualizar una matricula segun su id.
router.put("/matriculas/:id", async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    if (matricula) {
      await matricula.update(req.body);
      return res.status(201).json(matricula);
    } else {
      return res.status(404).json({ message: "La matricula no existe" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Eliminar una matricula segun su id.
router.delete("/matriculas/:id", async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    if (matricula) {
      await matricula.destroy();
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "La matricula no existe" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor: ", error });
  }
});

export default router;
