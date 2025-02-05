"use client";
import React, { useState } from "react";
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  DateInput
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CardUser } from "@/components/reusable/user/cardUser";
import { horas } from "@/utils/constantes/data";
import { IoSearch } from "react-icons/io5";

export default function InformacionEquipo() {
  const router = useRouter();
  let EQUIPO = [
    {
      id: 1, //cedula
      nombre: "Cata Preci",
      especialidad: "sprinter",
      genero: "Femenino",
      contextura: "delgada",
      tiempo: "10",
    },
    {
      id: 2,
      nombre: "Cata Preci",
      especialidad: "sprinter",
      genero: "Femenino",
      contextura: "delgada",
      tiempo: "10",
    },
    {
      id: 3,
      nombre: "Cata Preci",
      especialidad: "sprinter",
      genero: "Femenino",
      contextura: "delgada",
      tiempo: "10",
    },
  ];
  let DATOS = [
    {
      nombre: "Cata Preci",
      pais: "Colombia",
    },
  ];
  const [formData, setFormData] = useState({
    date: "",
    timeStart: "",
    timeEnd: ""
  });
  const [search, setSearch] = useState("");

  function handleChange(e: any): void {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <Title className="text-center" mesage="RECURSOS" />
      </div>
      <div className="grid gap-x-5 gap-y-5 grid-flow-row md:grid-flow-col md:gap-x-10 lg:gap-x-14 rounded-default min-w-[400px]">
        <div className="my-auto">
          <div className="flex flex-col md:block">
            <Title
              className="mb-5 text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
              mesage="RESERVAR RECURSO"
            />
            <CardWrapper className="bg-background p-3 md:p-5 lg:p-7 rounded-default border-1 border-content1 shadow-button">
              <div className="grid grid-cols-1 gap-2">
                <DateInput
                  isRequired={true}
                  variant="underlined"
                  label="Fecha de Reserva"
                  name="date"
                  value={null}
                  onChange={handleChange}
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
                  onSelectionChange={(value) => handleChange({ target: { name: 'timeStart', value } })}
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
                  onSelectionChange={(value) => handleChange({ target: { name: 'timeEnd', value } })}
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
            >
              Reservar
            </Button>
          </div>
        </div>
        <div>
          <Input
            className="border-1 border-secondary rounded-default w-full mb-5"
            type="text"
            placeholder="Recursos"
            radius="full"
            labelPlacement="outside"
            value={search}
            onValueChange={setSearch}
            startContent={<IoSearch className="w-6 h-6" />}
          />
          <CardWrapper className="bg-background p-3 md:p-5 lg:p-7 rounded-default border-1 border-content1 shadow-button">
            <div className="grid grid-cols-1 gap-2">
              {EQUIPO.map((miembro) => (
                <CardUser
                  key={miembro.id} // Asegúrate de proporcionar una key única para cada elemento de la lista
                  nombre={miembro.nombre}
                  especialidad={miembro.especialidad}
                  tiempoAcomulado={miembro.tiempo}
                  genero={miembro.genero}
                  contextura={miembro.contextura}
                />
              ))}
            </div>
          </CardWrapper>
        </div>
      </div>
    </>
  );
}
