"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { horas, daysOfWeek } from "@/utils/constantes/data";

export default function Confirmar() {
  const router = useRouter();

  const [selectedResourceId, setSelectedResourceId] = useState<string>("");

  const [formData, setFormData] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: ""
  });

  // almacena el arreglo de la API
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    async function fetchResources() {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          toast.error("No se encontró el token de autenticación. Inicia sesión nuevamente.");
          router.push("/login");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/resource`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Respuesta de la API:", response);
        setResources(response.data);
      } catch (error) {
        console.error("Error al obtener los recursos:", error);
        toast.error("Error al obtener los recursos");
      }
    }

    fetchResources();
  }, [router]);

  //formato correcto "HH:MM:SS"
  function formatTimeToHHMMSS(time: string) {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}:00`; // Agrega los segundos como 00
  }

  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleResourceSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const resourceId = e.target.value;
    setSelectedResourceId(resourceId); //almacenamos el resource ID para enviarlo en el post
    console.log("selectedResourceId:", resourceId); // Imprime el valor seleccionado
  }

  async function Reservar(e: React.FormEvent) {
    e.preventDefault(); 

    // Formatear las horas al formato necesario antes de enviar la solicitud
    const formattedStartTime = formatTimeToHHMMSS(formData.startTime);
    const formattedEndTime = formatTimeToHHMMSS(formData.endTime);

    const formattedData = {
      ...formData,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };

    console.log("Contenido de formData:", formattedData);  // Imprime el contenido de formData antes de la solicitud

    if (!selectedResourceId) {
      toast.error("No se ha seleccionado un recurso.");
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        toast.error("No se encontró la información del usuario. Inicia sesión nuevamente.");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/resourcetype/${selectedResourceId}/schedule`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Reservado con éxito");
        router.push("/misreservas");
      }
    } catch (error) {
      toast.error("Oops! Error en la creación de la unidad");
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <Title className="text-center" mesage="RESERVAR RECURSO" />
      </div>
      <div className="grid gap-x-5 gap-y-5 grid-flow-row md:grid-flow-col md:gap-x-10 lg:gap-x-14 rounded-default min-w-[400px]">
        <div className="my-auto">
          <div className="flex flex-col md:block">
            <CardWrapper className="bg-background p-3 md:p-5 lg:p-7 rounded-default border-1 border-content1 shadow-button">
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label htmlFor="resourceId" className="font-bold">
                    Seleccionar Recurso
                  </label>
                  <select
                    id="resourceId"
                    value={selectedResourceId}
                    onChange={handleResourceSelect} 
                    className="w-full border-b-2 border-secondary bg-transparent focus:outline-none"
                    required
                  >
                    <option value="">Seleccionar Recurso</option>
                    {resources.map((resource) => (
                      <option key={resource.recursoId} value={resource.recursoId}>
                        {resource.nombre} {resource.descripcion && `- ${resource.descripcion}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="dayOfWeek" className="font-bold">
                    Fecha de reserva
                  </label>
                  <select
                    id="dayOfWeek"
                    name="dayOfWeek"
                    value={formData.dayOfWeek}
                    onChange={handleChange}
                    className="w-full border-b-2 border-secondary bg-transparent focus:outline-none"
                    required
                  >
                    <option value="">Seleccionar Día</option>
                    {daysOfWeek.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="startTime" className="font-bold">
                    Hora de Inicio
                  </label>
                  <select
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full border-b-2 border-secondary bg-transparent focus:outline-none"
                    required
                  >
                    <option value="">Seleccionar Hora</option>
                    {horas.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="endTime" className="font-bold">
                    Hora de Finalización
                  </label>
                  <select
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full border-b-2 border-secondary bg-transparent focus:outline-none"
                    required
                  >
                    <option value="">Seleccionar Hora</option>
                    {horas.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardWrapper>
          </div>
          <div className="flex flex-col items-center mt-5">
            <Button
              color="secondary"
              variant="solid"
              type="button"  
              radius="full"
              className="w-1/3 min-w-32 mb-2 bg-secondary text-white"
              onClick={Reservar} 
            >
              Reservar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
