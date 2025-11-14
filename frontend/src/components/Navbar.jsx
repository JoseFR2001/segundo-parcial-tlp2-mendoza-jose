import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Navbar = () => {
  // TODO: Obtener datos del usuario desde /api/profile
  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'
  // TODO: Después del logout exitoso, redireccionar a /login
  // TODO: Manejar errores apropiadamente
  const navigate = useNavigate();
  const [profile, setProfile] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log("Esta es la data que viene desde el Navbar", data);
    } catch (error) {
      console.error("Error al trar el perfil:", error);
    }
  };
  useEffect(() => {
    getData();
  });

  const handleLogout = async () => {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      navigate("/login");
    }
    if (!res.ok) {
      alert(data.message);
    }
  };

  const userName = "Usuario"; // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{userName}</span>
          </span>

          <button
            onClick={() => {
              // TODO: Implementar handleLogout aquí
              handleLogout();
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
