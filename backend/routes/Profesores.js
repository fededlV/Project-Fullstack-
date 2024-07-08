import express from "express";
import { Op } from "sequelize";
import { Profesor } from "../models/profesores.js";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/profesores/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los profesores y obtener profesor por nombre
router.get("/profesores", async (req, res) => {
  try {
    const nombre = req.query.nombre;
    if (nombre) {
      const profesor = await Profesor.findOne({
        where: {
          Nombre: { [Op.like]: `%${nombre}%` },
        },
      });
      if (profesor) {
        return res.status(200).json(profesor);
      } else {
        return res.status(404).json({ mensaje: "Profesor no encontrado" });
      }
    } else {
      const profesores = await Profesor.findAll();
      return res.status(200).json(profesores);
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener profesor por id
router.get("/profesores/:id", async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (profesor) {
      return res.status(200).json(profesor);
    } else {
      return res.status(404).json({ mensaje: "Profesor no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Crear un nuevo profesor
router.post("/profesores", async (req, res) => {
  try {
    const existeProfesor = await Profesor.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Apellido: req.body.Apellido },
          { Fecha_Nacimiento: req.body.Fecha_Nacimiento },
          { Especialidad: req.body.Especialidad },
          { Telefono: req.body.Telefono },
          { Email: req.body.Email },
        ],
      },
    });
    if (existeProfesor) {
      return res.status(400).json({ mensaje: "El profesor ya existe" });
    }
    const profesor = await Profesor.create(req.body);
    if (profesor) {
      return res.status(201).json(profesor);
    } else {
      return res.status(400).json({ mensaje: "No se pudo crear el profesor" });
    }
  } catch (error) {
    console.error("Error en la petición POST de profesores", error);
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Actualizar un profesor por id
router.put("/profesores/:id", async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (profesor) {
      const profesorAct = await profesor.update(req.body);
      return res.status(200).json(profesorAct);
    } else {
      return res.status(404).json({ mensaje: "Profesor no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Eliminar un profesor por id
router.delete("/profesores/:id", async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (profesor) {
      await profesor.destroy();
      return res.status(204).end();
    } else {
      return res.status(404).json({ mensaje: "Profesor no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor: ", error });
  }
});

export default router;
