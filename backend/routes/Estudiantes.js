import express from "express";
import { Op } from "sequelize";
import { Estudiante } from "../models/estudiantes.js";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/estudiantes/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los estudiantes Y obtener estudiante por nombre
router.get("/estudiantes", async (req, res) => {
  try {
    const nombre = req.query.nombre;
    if (nombre) {
      const estudiante = await Estudiante.findOne({
        where: {
          Nombre: { [Op.like]: `%${nombre}%` },
        },
      });
      if (estudiante) {
        return res.status(200).json(estudiante);
      } else {
        return res.status(404).json({ mensaje: "Estudiante no encontrado" });
      }
    } else {
      const estudiantes = await Estudiante.findAll();
      return res.status(200).json(estudiantes);
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener estuadiante por id
router.get("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      return res.status(200).json(estudiante);
    } else {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear un nuevo estudiante
router.post("/estudiantes", async (req, res) => {
  try {
    const existeEstudiante = await Estudiante.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Apellido: req.body.Apellido },
          { Fecha_nacimiento: req.body.Fecha_nacimiento },
          { Direccion: req.body.Direccion },
          { Telefono: req.body.Telefono },
          { Email: req.body.Email },
        ],
      },
    });
    if (existeEstudiante) {
      return res.status(400).json({ mensaje: "El estudiante ya existe" });
    }
    const estudiante = await Estudiante.create(req.body);
    if (estudiante) {
      return res.status(201).json(estudiante);
    } else {
      return res
        .status(400)
        .json({ mensaje: "No se pudo crear el estudiante" });
    }
  } catch (error) {
    console.error("Error en la petición POST de estudiantes", error);
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});
//Actualizar un estudiante por id
router.put("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      const estudianteAct = await estudiante.update(req.body);
      return res.status(200).json(estudianteAct);
    } else {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});
//Eliminar un estudiante por id
router.delete("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      console.log(estudiante);
      await estudiante.destroy();
      return res.status(204).end();
    } else {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
