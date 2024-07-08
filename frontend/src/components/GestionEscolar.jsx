import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

// Importamos las imágenes uniformes
import ActExtracurricularesImg from "./assets/ActExtracurriculares.jpg";
import asignaturasImg from "./assets/asignaturas.jpg";
import asistenciasImg from "./assets/asistencias.jpg";
import calificacionesImg from "./assets/calificaciones.jpg";
import cursosImg from "./assets/cursos.jpg";
import estudiantesImg from "./assets/estudiantes.jpg";
import horariosImg from "./assets/horarios.jpg";
import material_cursoImg from "./assets/material_curso.jpg";
import matriculasImg from "./assets/matriculas.jpg";
import profesoresImg from "./assets/profesores.jpg";


import "./GestionEscolar.css"; 

export default function GestionEscolar() {
  // Lista de categorías y sus respectivas imágenes
  const categorias = [
    { nombre: "Actividad Extracurriculares", img: ActExtracurricularesImg, link: "/actExtracurriculares"},
    { nombre: "Asignaturas", img:asignaturasImg, link: "/asignaturas"},
    { nombre: "Asistencias", img: asistenciasImg, link: "/asistencias"},
    { nombre: "Calificaciones", img: calificacionesImg, link: "/calificaciones"},
    { nombre: "Cursos", img: cursosImg, link: "/cursos" },
    { nombre: "Estudiantes", img: estudiantesImg, link: "/estudiantes" },
    { nombre: "Horarios", img: horariosImg, link: "/horarios" },
    { nombre: "Materiales del curso", img: material_cursoImg, link: "/materiales"},
    { nombre: "Matriculas", img: matriculasImg, link: "/matriculas"},
    { nombre: "Profesores", img: profesoresImg, link: "/profesores" },
  ];

  // Dividimos las categorías en dos filas de 5 elementos cada una
  const primeraFila = categorias.slice(0, 5);
  const segundaFila = categorias.slice(5, 10);

  return (
    <div className="gestion-escolar">
      <div className="fila-categorias">
        {primeraFila.map((categoria) => (
          <Card className="categoria-card" key={categoria.nombre}>
            <Card.Img variant="top" src={categoria.img} className="categoria-img" />
            <Card.Body>
              <Card.Text>
                <Button href={categoria.link} variant="outline-success">
                  {categoria.nombre}
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="fila-categorias">
        {segundaFila.map((categoria) => (
          <Card className="categoria-card" key={categoria.nombre}>
            <Card.Img variant="top" src={categoria.img} className="categoria-img" />
            <Card.Body>
              <Card.Text>
                <Button href={categoria.link} variant="outline-success">
                  {categoria.nombre}
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
