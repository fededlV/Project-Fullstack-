import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Estudiante from "./components/Estudiantes/Estudiante";
import NavBar from "./components/Navbar";
import GestionEscolar from "./components/GestionEscolar";
import { Inicio } from "./components/Home";
import Calificacion from "./components/Calificaciones/Calificacion";
import Horario from "./components/Horarios/Horario"
import Asistencia from "./components/Asistencias/Asistencias";
import Profesores from "./components/Profesores/Profesores";
import Curso from "./components/Cursos/Cursos";
import Asignaturas from "./components/Asignaturas/Asignaturas";
import Material from "./components/Materiales/Materiales";
import Matricula from "./components/Matriculas/Matriculas";
import ActExtracurriculares from "./components/ActExtracurriculares/ActExtracurriculares";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestionEscolar" element={<GestionEscolar />} />
          <Route path="/estudiantes" element={<Estudiante />} />
          <Route path="/horarios" element={<Horario />} />
          <Route path="/calificaciones" element={<Calificacion />} />
          <Route path="/asistencias" element={<Asistencia/>} />
          <Route path="/profesores" element={<Profesores/>} />
          <Route path="/cursos" element={<Curso />} />
          <Route path="/asignaturas" element={<Asignaturas />} />
          <Route path="/materiales" element={<Material />} />
          <Route path="/matriculas" element={<Matricula />} />
          <Route path="/actExtracurriculares" element={<ActExtracurriculares />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
