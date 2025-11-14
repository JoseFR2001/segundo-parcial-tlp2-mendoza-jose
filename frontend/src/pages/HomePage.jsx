import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  // TODO: Integrar lógica para obtener superhéroes desde la API
  // TODO: Implementar useState para almacenar la lista de superhéroes
  // TODO: Implementar función para recargar superhéroes
  const [profile, setProfile] = useState({});
  const [superHeroes, setSuperHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDataProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setProfile(data.user);
    } catch (error) {
      console.error("Error al trar el perfil:", error);
    }
  };
  const getDataSuperHeroes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/superheroes", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setSuperHeroes(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al trar el perfil:", error);
    }
  };
  useEffect(() => {
    getDataProfile();
    getDataSuperHeroes();
  }, []);

  const handleReload = () => {
    setSuperHeroes([]);
    getDataSuperHeroes();
  };
  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
        ¡Bienvenido/a, {profile.name}! <br />
        Galería de Superhéroes
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => {
            // TODO: Implementar función para recargar superhéroes
            handleReload();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
        >
          Recargar
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {superHeroes.map((hero) => (
            <div
              key={hero.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={hero.image}
                alt={hero.superhero}
                className="h-64 object-cover w-full"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {hero.superhero}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
