import { Curso } from "../models/curso.js";
import express from "express";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/cursos/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obetener todos los cursos y obtener curso por nombre
router.get("/cursos", async (req, res) => {
  try {
    const nombre = req.query.nombre;
    if (nombre) {
      const curso = await Curso.findOne({
        where: {
          Nombre: { [Op.like]: `%${nombre}%` },
        },
      });
      if (curso) {
        return res.status(200).json(curso);
      } else {
        return res.status(404).json({ mensaje: "Curso no encontrado" });
      }
    } else {
      const cursos = await Curso.findAll();
      return res.status(200).json(cursos);
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

router.get("/cursos/:id", async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (curso) {
      return res.status(200).json(curso);
    } else {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear un nuevo curso
router.post("/cursos", async (req, res) => {
  try {
    //Verificar si existe el curso
    const existeCurso = await Curso.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Descripcion: req.body.Descripcion },
          { Fecha_Inicio: req.body.Fecha_Inicio },
          { Fecha_Fin: req.body.Fecha_Fin },
        ],
      },
    });
    //Si existe el curso, se envía un mensaje de error
    if (existeCurso) {
      return res.status(400).json({ mensaje: "El curso ya existe" });
    }
    //Si no existe el curso, se crea uno nuevo
    const curso = await Curso.create(req.body);
    if (curso) {
      return res.status(201).json(curso);
    } else {
      return res.status(400).json({ mensaje: "No se pudo crear el curso" });
    }
  } catch (error) {
    console.error("Error en la petición POST de cursos", error);
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Actualizar un curso por id
router.put("/cursos/:id", async (req, res) => {
  try {
    const curso = await Curso.findOne({
      where: {
        Id_Curso: req.params.id,
      },
    });
    if (curso) {
      await curso.update(req.body);
      return res.status(200).json(curso);
    } else {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }
  } catch (error) {
    console.error("Error en la petición PUT de cursos", error);
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Borrar un curso por id
router.delete("/cursos/:id", async (req, res) => {
  try {
    const eliminado = await Curso.findOne({
      where: {
        Id_Curso: req.params.id,
      },
    });
    if (eliminado) {
      await eliminado.destroy();
      return res.status(204).end();
    } else {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }
  } catch (error) {
    console.error("Error en la petición DELETE de cursos", error);
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
