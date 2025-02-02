"use client";
import React, { useState } from "react";
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CardUser } from "@/components/reusable/user/cardUser";
import { paises, masajista } from "@/utils/constantes/data";

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
    nacionalidad: "",
    nombre: "",
    masajista: "",
  });

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
        <Title className="text-center" mesage="INFORMACION DEL EQUIPO" />
      </div>
      <div className="grid gap-x-5 gap-y-5 grid-flow-row md:grid-flow-col md:gap-x-10 lg:gap-x-14 rounded-default min-w-[400px]">
        <div className="my-auto">
          <div className="flex flex-col md:block">
            <Title
              className="text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
              mesage="EQUIPO"
            />
            <CardWrapper className="bg-background p-3 md:p-5 lg:p-7 rounded-default border-1 border-content1 shadow-button">
              <div className="grid grid-cols-1 gap-2">
                <Input
                  isRequired={true}
                  type="text"
                  variant="underlined"
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Los Best"
                  classNames={{
                    base: "font-bold",
                  }}
                />
                <Autocomplete
                  isRequired={true}
                  label="Nacionalidad"
                  color="secondary"
                  variant="underlined"
                  size="md"
                  radius="md"
                  placeholder="Seleccione un Nacionalidad"
                  defaultItems={paises}
                  defaultSelectedKey={formData.nacionalidad}
                  onSelectionChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      nacionalidad: value as string,
                    }))
                  }
                  classNames={{
                    base: "font-bold",
                  }}
                >
                  {paises.map((option) => (
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
                  label="Masajista"
                  color="secondary"
                  variant="underlined"
                  size="md"
                  radius="md"
                  placeholder="Seleccione un Masajista"
                  defaultItems={masajista}
                  defaultSelectedKey={formData.masajista}
                  onSelectionChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      masajista: value as string,
                    }))
                  }
                  classNames={{
                    base: "font-bold",
                  }}
                >
                  {masajista.map((option) => (
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
              Editar
            </Button>
          </div>
        </div>
        <div>
          <Title
            className="text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
            mesage="INTEGRANTES"
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
