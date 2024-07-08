import express from "express";
import { Material_Curso } from "../models/Material_Curso.js";
import { Curso } from "../models/curso.js";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/materiales/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obetener todos los materiales y obtener material por descripcion
router.get("/materiales", async (req, res) => {
  try {
    const descripcion = req.query.descripcion;
    if (descripcion) {
      const material = await Material_Curso.findOne({
        where: {
          Descripcion: { [Op.like]: `%${descripcion}%` },
        },
      });
      if (material) {
        return res.status(200).json(material);
      } else {
        return res.status(404).json({ mensaje: "Material no encontrado" });
      }
    } else {
      const materiales = await Material_Curso.findAll();
      return res.status(200).json(materiales);
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

router.get("/materiales/:id", async (req, res) => {
  try {
    const material = await Material_Curso.findByPk(req.params.id);
    if (material) {
      return res.status(200).json(material);
    } else {
      return res.status(404).json({ mensaje: "Material no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear un nuevo material.
router.post("/materiales", async (req, res) => {
  try {
    const cursoExiste = await Curso.findByPk(req.body.Id_Curso);
    if (!cursoExiste) {
      return res.status(400).json({ message: "El curso no existe." });
    }

    const existeMaterial = await Material_Curso.findOne({
      where: {
        [Op.and]: [
          { Descripcion: req.body.Descripcion },
          { Tipo_Material: req.body.Tipo_Material },
          { URL: req.body.URL },
          { Id_Curso: req.body.Id_Curso },
        ],
      },
    });
    if (existeMaterial) {
      return res.status(400).json({ message: "El material ya existe." });
    }
    const newMaterial = await Material_Curso.create(req.body);
    if (newMaterial) {
      return res.status(201).json(newMaterial);
    } else {
      return res.status(400).json({ message: "No se pudo crear el material." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Actualizar un material segun su id.
router.put("/materiales/:id", async (req, res) => {
  try {
    const material = await Material_Curso.findByPk(req.params.id);
    if (material) {
      await material.update(req.body);
      return res.status(201).json(material);
    } else {
      return res.status(404).json({ message: "No se encontró el material." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Eliminar material segun su id.
router.delete("/materiales/:id", async (req, res) => {
  try {
    const material = await Material_Curso.findByPk(req.params.id);
    if (material) {
      await material.destroy();
      return res.status(200).json({ message: "Material eliminado." });
    } else {
      return res.status(404).json({ message: "No se encontró el material." });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
