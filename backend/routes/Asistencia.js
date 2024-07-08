import express from "express";
import { Asistencia } from "../models/Asistencia.js";
import { Horario } from "../models/Horario.js";
import { Estudiante } from "../models/estudiantes.js";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/asistencias/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});



// Obtener todas las asistencias y la asistencia segun el horaInicio, horaFin y fecha.
router.get("/asistencias", async (req, res) => {
  try {
    const { Fecha, HoraInicio, HoraFin } = req.query;
    
    if (HoraInicio && HoraFin && Fecha) {
      const asistencias = await Asistencia.findAll({
        where: {
          ...(Fecha && { Fecha: Fecha }), // Filter Asistencia by Fecha if provided
        },
        include: [{
          model: Horario, // Join with Horario
          where: {
            ...(HoraInicio && { Hora_Inicio: HoraInicio }), // Filter Horario by HoraInicio if provided
            ...(HoraFin && { Hora_Fin: HoraFin }), // Filter Horario by HoraFin if provided
          },
          required: true // Join Horario con Asistencia
        }]
      });
  
      if (asistencias.length > 0) {
        res.status(200).json(asistencias);
      } else {
        res.status(404).json({ mensaje: "No se encontraron asistencias con los criterios especificados." });
      }
    } else {
      const asistencias = await Asistencia.findAll();
      if (asistencias) {
        res.status(200).json(asistencias);
      } else {
        res.status(404).json({ mensaje: "No se encontraron asistencias" });
      }
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Obtener asistencias por id.
router.get("/asistencias/:id", async (req, res) => {
  try {
    const asistencia = await Asistencia.findByPk(req.params.id);
    if (asistencia) {
      res.status(200).json(asistencia);
    } else {
      res.status(404).json({
        mensaje: "No se encontró la asistencia con ese ID",
      });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Crear una nueva asistencia.
router.post("/asistencias", async (req, res) => {
  try {
    // Verificar si el estudiante existe
    const estudianteExiste = await Estudiante.findByPk(req.body.Id_Estudiante);
    if (!estudianteExiste) {
      return res.status(404).json({ mensaje: "El estudiante no existe." });
    }

    // Verificar si el horario existe
    const horarioExiste = await Horario.findByPk(req.body.Id_Horario);
    if (!horarioExiste) {
      return res.status(404).json({ mensaje: "El horario no existe." });
    }
    const existeAsistencia = await Asistencia.findOne({
      where: {
        [Op.and]: [
          { Fecha: req.body.Fecha },
          { Asistio: req.body.Asistio },
          { Id_Estudiante: req.body.Id_Estudiante },
          { Id_Horario: req.body.Id_Horario },
        ],
      },
    });
    if (existeAsistencia) {
      res.status(400).json({ mensaje: "La asistencia ya existe." });
    }
    //Crea la nueva asistencia
    const newAsistencia = await Asistencia.create(req.body);
    if (newAsistencia) {
      res.status(201).json(newAsistencia);
    } else {
      res.status(400).json({ mensaje: "Error al crear la asistencia." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Actualizar una asistencia por id.
router.put("/asistencias/:id", async (req, res) => {
  try {
    const asistencia = await Asistencia.findByPk(req.params.id);
    if (asistencia) {
      await asistencia.update(req.body);
      res.status(200).json(asistencia);
    } else {
      res
        .status(404)
        .json({ mensaje: "Asistencia con ese ID no encontrada." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Eliminar una asistencia por id.
router.delete("/asistencias/:id", async (req, res) => {
  try {
    const eliminado = await Asistencia.findByPk(req.params.id);
    if (eliminado) {
      await eliminado.destroy();
      res.status(200).json({ mensaje: "Asistencia del alumno eliminada." });
    } else {
      res
        .status(404)
        .json({ mensaje: "Asistencia del alumno no encontrada." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
