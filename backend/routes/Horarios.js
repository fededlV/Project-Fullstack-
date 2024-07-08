import { Horario } from "../models/Horario.js";
import express from "express";
import { Op } from "sequelize";
import { Asignatura } from "../models/asignatura.js";
import { Curso } from "../models/curso.js";
import { Profesor } from "../models/profesores.js";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/horarios/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los horarios y un horario filtrado por día
router.get("/horarios", async (req, res) => {
  try {
    const dia = req.query.dia;
    if (dia) {
      const horario = await Horario.findAll({
        where: {
          Dia: { [Op.like]: `%${dia}%` },
        },
      });
      if (horario) {
        return res.status(200).json(horario);
      } else {
        return res.status(404).json({ mensaje: "Horario no encontrado" });
      }
    } else {
      const horarios = await Horario.findAll();
      return res.status(200).json(horarios);
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener Horarios por id
router.get("/horarios/:id", async (req, res) => {
  try {
    const lst = await Horario.findByPk(req.params.id);
    if (lst) {
      return res.status(200).json(lst);
    } else {
      return res.status(404).json({
        mensaje: "No se encontraron horarios para la asignatura indicada.",
      });
    }
  } catch (error) {
    console.error("Error obteniendo horarios:", error);
    return res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Crear un nuevo horario
router.post("/horarios", async (req, res) => {
  try {
    const existeAsignatura = await Asignatura.findByPk(req.body.Id_Asignatura);
    if (!existeAsignatura) {
      return res.status(400).json({ mensaje: "La asignatura no existe" });
    }
    const existeCurso = await Curso.findByPk(req.body.Id_Curso);
    if (!existeCurso) {
      return res.status(400).json({ mensaje: "El curso no existe" });
    }
    const existeProfesor = await Profesor.findByPk(req.body.Id_Profesor);
    if (!existeProfesor) {
      return res.status(400).json({ mensaje: "El profesor no existe" });
    }
    const existeHorario = await Horario.findOne({
      where: {
        [Op.and]: [
          { Dia: req.body.Dia },
          { Hora_Inicio: req.body.Hora_Inicio },
          { Hora_Fin: req.body.Hora_Fin },
          { Aula: req.body.Aula },
          { Id_Asignatura: req.body.Id_Asignatura },
          { Id_Curso: req.body.Id_Curso },
          { Id_Profesor: req.body.Id_Profesor },
        ],
      },
    });
    if (existeHorario) {
      return res.status(400).json({ mensaje: "El horario ya existe" });
    }
    const nuevoHorario = await Horario.create({
      Dia: req.body.Dia,
      Hora_Inicio: req.body.Hora_Inicio,
      Hora_Fin: req.body.Hora_Fin,
      Aula: req.body.Aula,
      Id_Asignatura: req.body.Id_Asignatura,
      Id_Curso: req.body.Id_Curso,
      Id_Profesor: req.body.Id_Profesor,
    });
    if (nuevoHorario) {
      return res.status(201).json(nuevoHorario);
    } else {
      return res.status(404).json({ message: "No se pudo crear el nuevo horario." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Actualizar un horario por id
router.put("/horarios/:id", async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (horario) {
      await horario.update(req.body);
      return res.status(200).json(horario);
    } else {
      return res.status(404).json({ message: "Horario no encontrado." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error del servidor", details: error.message });
  }
});
//Borrar un horario por id
router.delete("/horarios/:id", async (req, res) => {
  try {
    const eliminado = await Horario.findByPk(req.params.id);
    if (eliminado) {
      await eliminado.destroy();
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Horario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor: ", error });
  }
});

export default router;
