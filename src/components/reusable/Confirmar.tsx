"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { Button, DateInput, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { horas } from "@/utils/constantes/data";
import { CalendarDate } from "@internationalized/date";


const today = new CalendarDate(
  new Date().getFullYear(),
  new Date().getMonth() + 1, // Los meses en JavaScript son base 0
  new Date().getDate()
);
function ChangeDate(value: any) {
  return value.year.toString().padStart(2, '0') + '-' + value.month.toString().padStart(2, '0') + '-' + value.day.toString().padStart(2, '0')
}
export default function Confirmar() {
  const router = useRouter();

  const [selectedResourceId, setSelectedResourceId] = useState<string>("");

  const [formData, setFormData] = useState({
    userId: Number(localStorage.getItem('user_id')),
    date: today,
    start: "",
    end: ""
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
    e: any
  ) {
    const { name, value } = e.target;
    console.log(name, value)
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
    const formattedData = {
      ...formData,
      date: ChangeDate(formData.date)
    };

    console.log("Contenido de formData:", formattedData);  // Imprime el contenido de formData antes de la solicitud

    if (!selectedResourceId) {
      toast.error("No se ha seleccionado un recurso.");
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      const userId=localStorage.getItem('user_id')
      if (!userId || !token) {
        toast.error("No se encontró la información del usuario. Inicia sesión nuevamente.");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/resource/${selectedResourceId}/book`,
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
      toast.error("Oops! Error en la reservacion"+ error);
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

                <DateInput
                  isRequired={true}
                  variant="underlined"
                  label="Fecha de Reserva"
                  name="date"
                  value={formData.date}
                  onChange={(value) => handleChange({ target: { name: 'date', value } })}
                  classNames={{
                    base: "font-bold",
                  }}
                />

                <Autocomplete
                  isRequired={true}
                  label="Hora de Inicio"
                  color="secondary"
                  variant="underlined"
                  size="md"
                  radius="md"
                  placeholder="Seleccionar Hora"
                  onSelectionChange={(value) => handleChange({ target: { name: 'start', value } })}
                  classNames={{
                    base: "font-bold",
                  }}
                >
                  {horas.map((option) => (
                    <AutocompleteItem
                      key={option.value}
                      value={option.label}
                      classNames={{
                        selectedIcon: "text-secondary",
                      }}
                    >
                      {option.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Autocomplete
                  isRequired={true}
                  label="Hora de Finalización"
                  color="secondary"
                  variant="underlined"
                  size="md"
                  radius="md"
                  placeholder="Seleccionar hora"
                  onSelectionChange={(value) => handleChange({ target: { name: 'end', value } })}
                  classNames={{
                    base: "font-bold",
                  }}
                >
                  {horas.map((option) => (
                    <AutocompleteItem
                      key={option.value}
                      value={option.label}
                      classNames={{
                        selectedIcon: "text-secondary",
                      }}
                    >
                      {option.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
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
