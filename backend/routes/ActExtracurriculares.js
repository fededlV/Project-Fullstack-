import express from "express";
import { Actividad_Extracurricular } from "../models/ActExtracurriculares.js";
import { Profesor } from "../models/profesores.js";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/actividadesExtracurriculares/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obetener todas las actividades y obtener actividad por nombre
router.get("/actividadesExtracurriculares", async (req, res) => {
  try {
    const nombre = req.query.nombre;
    if (nombre) {
      const actividad = await Actividad_Extracurricular.findOne({
        where: {
          Nombre: { [Op.like]: `%${nombre}%` },
        },
      });
      if (actividad) {
        return res.status(200).json(actividad);
      } else {
        return res
          .status(404)
          .json({ mensaje: "Actividad Extracurricular no encontrado" });
      }
    } else {
      const actividades = await Actividad_Extracurricular.findAll();
      return res.status(200).json(actividades);
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

router.get("/actividadesExtracurriculares/:id", async (req, res) => {
  try {
    const actividad = await Actividad_Extracurricular.findByPk(req.params.id);
    if (actividad) {
      return res.status(200).json(actividad);
    } else {
      return res
        .status(404)
        .json({ mensaje: "Actividad Extracurricular no encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear una nueva actividad.
router.post("/actividadesExtracurriculares", async (req, res) => {
  try {
    const existeProfe = await Profesor.findByPk(req.body.Id_Profesor);
    if (!existeProfe) {
      return res.status(400).json({ mensaje: "El profesor no existe." });
    }
    const existeActividad = await Actividad_Extracurricular.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Descripcion: req.body.Descripcion },
          { Fecha: req.body.Fecha },
          { Id_Profesor: req.body.Id_Profesor },
        ],
      },
    });
    if (existeActividad) {
      return res.status(400).json({
        mensaje: "Ya existe una actividad extracurricular con esos datos.",
      });
    }
    const newAct = await Actividad_Extracurricular.create(req.body);
    if (newAct) {
      return res.status(201).json(newAct);
    } else {
      return res
        .status(400)
        .json({ mensaje: "No se pudo crear la actividad extracurricular." });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Actualizar una actividad extracurricular segun el id indicado.
router.put("/actividadesExtracurriculares/:id", async (req, res) => {
  try {
    const actividad = await Actividad_Extracurricular.findByPk(req.params.id);
    if (actividad) {
      await actividad.update(req.body);
      return res.status(200).json(actividad);
    } else {
      return res.status(404).json({
        mensaje: "No se encontró la actividad extracurricular con ese ID",
      });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Eliminar una actividad extracurricular segun el id indicado.
router.delete("/actividadesExtracurriculares/:id", async (req, res) => {
  try {
    const actividad = await Actividad_Extracurricular.findByPk(req.params.id);
    if (actividad) {
      await actividad.destroy();
      return res.status(200).json({ mensaje: "Actividad extracurricular eliminada." });
    } else {
      return res.status(404).json({
        mensaje: "No se encontró la actividad extracurricular con ese ID",
      });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
