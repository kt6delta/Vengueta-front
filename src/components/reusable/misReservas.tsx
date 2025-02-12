import React, { useState, useEffect } from "react";
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

type Reserva = {
  id: number;
  diaSemana: string; // "jueves"
  horaInicio: string; // "09:00:00"
  horaFin: string;   // "14:00:00"
};

type Recurso = {
  id_recurso: string;
  nombre: string;
  tipo_recurso: string;
  horario_disponibilidad: string[];
};

export default function MisReservas() {
  const router = useRouter();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [recursosRailWay, setRecursosRailWay] = useState<Recurso[]>([]);
  const [recursosRender, setRecursosRender] = useState<Recurso[]>([]);
    // prueba para ver la lógica
    // const testData: Reserva[] = [
    //   { id: 1, dayOfWeek: "lunes", startTime: "09:00:00", endTime: "10:00:00" },
    //   { id: 2, dayOfWeek: "martes", startTime: "10:00:00", endTime: "11:00:00" },
    //   { id: 3, dayOfWeek: "miércoles", startTime: "11:00:00", endTime: "12:00:00" },
    //   { id: 4, dayOfWeek: "jueves", startTime: "12:00:00", endTime: "13:00:00" },
    //   { id: 5, dayOfWeek: "viernes", startTime: "13:00:00", endTime: "14:00:00" },
    //   { id: 6, dayOfWeek: "sábado", startTime: "14:00:00", endTime: "15:00:00" },
    //   { id: 7, dayOfWeek: "domingo", startTime: "15:00:00", endTime: "16:00:00" },
    // ];



  // Función para obtener datos del primer proveedor (Railway)
  const fetchRecursosRailway = async () => {
    try {
      const response = await fetch(
        "https://progranovaintegraserviciosback-production.up.railway.app/integraservicios/api/external?id=1"
      );
      const data = await response.json();
      console.log(data)
      setRecursosRailWay(data["data"]["recursos_disponibles"]);
    } catch (error) {
      console.error("Error en la primera URL (Railway):", error);
    }
  };

  // Función para obtener datos del segundo proveedor (Render)
  const fetchRecursosRender = async () => {
    try {
      const response = await fetch(
        "https://backend-integraservicios.onrender.com/api/recursosDisponibles"
      );
      const data = await response.json();
      console.log(data)
      setRecursosRender(data["recursos_disponibles"]);
    } catch (error) {
      console.error("Error en la segunda URL (Render):", error);
      setRecursosRender([])
    }
  };




  

  const fetchReservas = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const resourceTypeId = localStorage.getItem("resourceType_id") || "1";

      if (!token) {
        toast.error("No se encontró el token de autenticación. Inicia sesión nuevamente.");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/resourcetype/${resourceTypeId}/schedule`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      toast.error("Error al cargar las reservas");
    }
  };

  useEffect(() => {
    fetchReservas();
    fetchRecursosRailway();
    fetchRecursosRender();
  }, []);

  const goToWeb = (url: string) => {
    window.open(url, "_blank"); // Abre la URL en una nueva pestaña
  };

  const handleReservar = () => {
    router.push("/confirmar");
  };

  const dayMapping: { [key: string]: number } = {
    "lunes": 1,
    "martes": 2,
    "miercoles": 3,
    "miércoles": 3,
    "jueves": 4,
    "viernes": 5,
    "sabado": 6, 
    "sábado": 6,
    "domingo": 7,
  };

  const todayJs = new Date().getDay();
  const todayNumber = todayJs === 0 ? 7 : todayJs; 

  // reservas activas: mayor o igual que el día actual
  // reservas vencidas: menor que el día actual
  const reservasActivas = reservas.filter((reserva) => {
    const dayReserva = dayMapping[reserva.diaSemana.toLowerCase()];
    return dayReserva >= todayNumber;
  });

  const reservasVencidas = reservas.filter((reserva) => {
    const dayReserva = dayMapping[reserva.diaSemana.toLowerCase()];
    return dayReserva < todayNumber;
  });

  return (
    <div className="col">
      <div className="flex items-center justify-center bg-white p-1">
      <div className="flex flex-col w-full max-w-5xl min-w-[400px] gap-3 mx-5">
        <Title className="text-center text-2xl font-bold mb-2" mesage="RESERVAS" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <CardWrapper className="p-5 rounded-lg shadow-lg border">
            <h2 className="text-lg font-semibold text-center mb-4">Activas</h2>
            <div className="grid grid-cols-1 gap-3">
              {reservasActivas.length > 0 ? (
                reservasActivas.map((reserva) => (
                  <div key={reserva.id} className="flex items-center gap-3 bg-blue-100 p-3 rounded-lg">
                    <span className="bg-blue-900 text-white p-2 rounded-full">👤</span>
                    <div>
                      <p className="font-semibold">{`Día: ${reserva.diaSemana}`}</p>
                      <p className="text-sm text-gray-600">{`${reserva.horaInicio} - ${reserva.horaFin}`}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No hay reservas activas</p>
              )}
            </div>
          </CardWrapper>

          <CardWrapper className="p-5 rounded-lg shadow-lg border">
            <h2 className="text-lg font-semibold text-center mb-4">Vencidas</h2>
            <div className="grid grid-cols-1 gap-3">
              {reservasVencidas.length > 0 ? (
                reservasVencidas.map((reserva) => (
                  <div key={reserva.id} className="flex items-center gap-3 bg-blue-100 p-3 rounded-lg">
                    <span className="bg-blue-900 text-white p-2 rounded-full">👤</span>
                    <div>
                      <p className="font-semibold">{`Día: ${reserva.diaSemana}`}</p>
                      <p className="text-sm text-gray-600">{`${reserva.horaInicio} - ${reserva.horaFin}`}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No hay reservas vencidas</p>
              )}
            </div>
          </CardWrapper>
        </div>

        <div className="flex justify-center">
          <Button
            style={{
              display: "inline-block",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              backgroundColor: "#2563EB",
              color: "#fff",
            }}
            className="mt-8"
            onClick={handleReservar}
          >
            Reservar
          </Button>
        </div>
      </div>
      
      
    </div>
    <Title className="text-center text-2xl font-bold mb-2" mesage="Otros recursos" />
      <div>
        {recursosRailWay.map((reserva) => (
                
                  <div className="col-md" onClick={() => goToWeb("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
                    <br></br>
                      <div key={reserva.id_recurso} className="flex items-center gap-3 bg-blue-100 p-3 rounded-lg">
                      <span className="bg-blue-900 text-white p-2 rounded-full">👤</span>
                      <div>
                        <h2>{reserva.nombre}</h2>
                        <p className="font-semibold">{`Descripciòn: ${reserva.tipo_recurso}`}</p>
                        {reserva.horario_disponibilidad.map((horario) => (<p className="text-sm"> {horario} </p>))}
                      </div>
                    </div>
                  </div>
                    
        ))}
      
      {recursosRender.map((reserva) => (
                
                <div className="col-md"  onClick={() => goToWeb("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
                  <br></br>
                    <div key={reserva.id_recurso} className="flex items-center gap-3 bg-blue-100 p-3 rounded-lg">
                    <span className="bg-blue-900 text-white p-2 rounded-full">👤</span>
                    <div>
                      <h2>{reserva.nombre}</h2>
                      <p className="font-semibold">{`Descripciòn: ${reserva.tipo_recurso}`}</p>
                      {reserva.horario_disponibilidad.map((horario) => (<p className="text-sm"> {horario} </p>))}
                    </div>
                  </div>
                </div>
                  
      ))}
    
      </div>
    </div>
    
  );
}
