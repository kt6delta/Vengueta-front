"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState} from "react";
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import {
  Autocomplete,
  AutocompleteItem,
  Button
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { horas,daysOfWeek } from "@/utils/constantes/data";


export default function Confirmar() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: ""
  });

  function handleChange(e: any): void {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function Reservar() {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("auth_token");

      if (!userId || !token) {
        toast.error("No se encontró la información del usuario. Inicia sesión nuevamente.");
        return;
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_BACKEND}/resourcetype/${userId}/schedule`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        toast.success("Reservado con exito");
        router.back()
      }
      return "";
    } catch (error) {
      toast.error("Oops! Error en la creación de la unidad");
      return "";
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
                        <Autocomplete
                          isRequired={true}
                          label="Fecha de reserva"
                          color="secondary"
                          variant="underlined"
                          size="md"
                          radius="md"
                          placeholder="Seleccionar Dia"
                          onSelectionChange={(value) => handleChange({ target: { name: 'dayOfWeek', value } })}
                          classNames={{
                            base: "font-bold",
                          }}
                        >
                          {daysOfWeek.map((option) => (
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
                  label="Hora de Inicio"
                  color="secondary"
                  variant="underlined"
                  size="md"
                  radius="md"
                  placeholder="Seleccionar Hora"
                  onSelectionChange={(value) => handleChange({ target: { name: 'startTime', value } })}
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
                  label="Hora de Finalizacion"
                  color="secondary"
                  variant="underlined"
                  size="md"
                  radius="md"
                  placeholder="Seleccione Hora"
                  onSelectionChange={(value) => handleChange({ target: { name: 'endTime', value } })}
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
              type="submit"
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
