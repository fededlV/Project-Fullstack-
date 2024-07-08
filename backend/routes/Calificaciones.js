import { Calificacion } from "../models/Calificacion.js";
import { Estudiante } from "../models/estudiantes.js";
import { Horario } from "../models/Horario.js";
import express from "express";
import { Op } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/calificaciones/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todas las calificaciones de todos los estudiantes y obtener calificacion de estudiante segun su nombre.
router.get("/calificaciones", async (req, res) => {
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

      // Usar el ID del estudiante para buscar su calificación y nombre
      const queryCalificacion = `
        SELECT 
          Calificaciones.*, 
          Estudiantes.Nombre AS NombreEstudiante, Estudiantes.Apellido AS ApellidoEstudiante 
        FROM 
          Calificaciones 
        JOIN 
          Estudiantes ON Calificaciones.Estudiante_Id = Estudiantes.Id_Estudiante 
        WHERE 
          Calificaciones.Estudiante_Id = :idEstudiante
        `;

      const calificaciones = await sequelize.query(queryCalificacion, {
        replacements: { idEstudiante: estudiante[0].Id_Estudiante },
        type: sequelize.QueryTypes.SELECT,
      });

      if (calificaciones.length === 0) {
        return res.status(404).json({ mensaje: "Calificación no encontrada" });
      }

      // Devolver la calificación encontrada junto con el nombre del estudiante
      return res.status(200).json(calificaciones);
    } else {
      // Obtener todas las calificaciones si el nombre no es porporcionado
      const calificaciones = await Calificacion.findAll();
      return res.status(200).json(calificaciones);
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener calificaciones por id
router.get("/calificaciones/:id", async (req, res) => {
  try {
    const calificacion = await Calificacion.findByPk(req.params.id);
    if (calificacion) {
      res.status(200).json(calificacion);
    } else {
      res.status(404).json({
        message: "Calificacion no encontrada",
      });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear una nueva calificacion
router.post("/calificaciones", async (req, res) => {
  try {
    const estExist = await Estudiante.findByPk(req.body.Estudiante_Id);
    if (!estExist) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    const horarioExist = await Horario.findByPk(req.body.Asignatura_Id);
    if (!horarioExist) {
      return res.status(404).json({ mensaje: "Asignatura no encontrada" });
    }
    // Verificar si existe la calificacion
    const existeCalificacion = await Calificacion.findOne({
      where: {
        [Op.and]: [
          { Estudiante_Id: req.body.Estudiante_Id },
          { Asignatura_Id: req.body.Asignatura_Id },
          { Nota: req.body.Nota },
          { Fecha: req.body.Fecha },
        ],
      },
    });
    // Si existe la calificacion, se envia un mensaje de error
    if (existeCalificacion) {
      res.status(400).json({ mensaje: "La calificacion ya existe" });
    }
    // Si no existe la calificacion, se crea una nueva
    const nuevaCalificacion = Calificacion.create({
      Estudiante_Id: req.body.Estudiante_Id,
      Asignatura_Id: req.body.Asignatura_Id,
      Nota: req.body.Nota,
      Fecha: req.body.Fecha,
    });
    if (nuevaCalificacion) {
      res.status(201).json(nuevaCalificacion);
    } else {
      res
        .status(404)
        .json({ message: "No se pudo cargar la nueva calificacion" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Actualizar una calificacion por id
router.put("/calificaciones/:id", async (req, res) => {
  try {
    const calificacion = await Calificacion.findByPk(req.params.id);
    if (calificacion) {
      await calificacion.update(req.body);
      res.status(200).json(calificacion);
    } else {
      res.status(404).json({ message: "Calificacion no encontrada" });
    }
  } catch (error) {
    console.error("Error obteniendo horarios:", error);
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Borrar una calificacion por id
router.delete("/calificaciones/:id", async (req, res) => {
  try {
    const eliminado = await Calificacion.findOne({
      where: {
        Id_Calificacion: req.params.id,
      },
    });

    if (eliminado) {
      await eliminado.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Calificación no encontrada" });
    }
  } catch (error) {
    console.error("Error eliminando calificación:", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
