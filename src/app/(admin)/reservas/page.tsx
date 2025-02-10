"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DragList } from "@/components/CardDrop/DragList";
import { Title } from "@/components/reusable/title";
import { IoSearch } from "react-icons/io5";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from 'next/navigation';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { horas } from "@/utils/constantes/data";
import axios from "axios";
import { Todo } from "@/utils/interfaces/types";

function CreateRecurso() {

}

const empty = [
  {
    nombre: "",
    especialidad: "",
  },
];

export default function Reservas() {
  useEffect(() => {
    getRecursos();
    getUnitDisponible()
  }, []);
  const [unidades, setUnidades] = useState<Todo[]>(empty);
  const [recursos, setRecursos] = useState<Todo[]>(empty);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    timeStart: "",
    timeEnd: ""
  });

  function CreateUnidad() {

  }

  async function getRecursos() {
    try {
      const token = localStorage.getItem("auth_token");
  
      if ( !token) {
        toast.error("No se encontró al usuario. Inicia sesión nuevamente.");
        return;
      }
  
      const recurse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/resource`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecursos(recurse.data);
  
    } catch (error) {
      console.error("Error al obtener los recursos:", error);
      toast.error("Error al cargar los recursos.");
    }
  }
  async function getUnitDisponible() {
    try {
      const token = localStorage.getItem("auth_token");
  
      if ( !token) {
        toast.error("No se encontró al usuario. Inicia sesión nuevamente.");
        return;
      }
  
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/serviceunit`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnidades(response.data);
  
    } catch (error) {
      console.error("Error al obtener las unidades:", error);
      toast.error("Error al cargar las unidades.");
    }
  }

  const AddHandle = (e: any) => {
    CreateRecurso();
  };

  function handleChange(e: any): void {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <div className="grid grid-cols-2 gap-5">
          <Title className="" mesage="UNIDADES" />
          <div className="flex justify-end items-center">
            <Input
              className="border-1 border-secondary rounded-default w-1/2"
              type="text"
              placeholder="unidad"
              radius="full"
              labelPlacement="outside"
              value={search}
              onValueChange={setSearch}
              startContent={<IoSearch className="w-6 h-6" />}
            />
          </div>
        </div>
      </div>
      <CardWrapper className="bg-white p-10 mb-5">
        <div className="grid gap-x-5 gap-y-5  md:gap-x-10 lg:gap-x-14 grid-cols-2 rounded-default min-w-[400px]">
          <DragList DISPONIBLES={unidades} AGREGADOS={recursos} />
        </div>
        <div className="flex justify-end items-start gap-5">
          <button onClick={AddHandle}>
            <IoMdAddCircle className="w-10 h-10" />
          </button>
          {/* <button onClick={MinusHandle}>
            <FaMinusCircle className="w-[32px] h-[32px]" />
          </button> */}
        </div>
      </CardWrapper>

      <div className="col-span-2">
        <div className="flex flex-col md:block">
          <Title
            className="text-left text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
            mesage="CREACIÓN DE UNIDAD"
          />
          <CardWrapper className="bg-white p-3 md:p-5 lg:p-7 rounded-default">
            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-1 gap-2">
                <Input
                  isRequired={true}
                  type="text"
                  variant="underlined"
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
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
            </div>
          </CardWrapper>
        </div>
      </div>

      <div className="flex flex-col items-center mt-5">
        <Button
          color="secondary"
          variant="solid"
          type="submit"
          radius="full"
          className="w-1/4 min-w-32 mb-2 text-white min-h-8"
          onClick={CreateUnidad}
        >
          <p className="text-sm md:text-base lg:text-xl">Crear</p>
        </Button>
      </div>
    </>
  );
};