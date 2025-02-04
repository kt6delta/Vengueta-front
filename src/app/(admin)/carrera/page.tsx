"use client";
import React, { useState } from "react";
import { DragList } from "@/components/CardDrop/DragList";
import { Title } from "@/components/reusable/title";
import { IoSearch } from "react-icons/io5";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { IoMdAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { horas } from "@/utils/constantes/data";


export default function Carrera() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    timeStart: "",
    timeEnd: ""
  });

  const AddHandle = (e: any) => {
    router.push("/director/creacionEquipo");
  };
  const MinusHandle = (e: any) => { };

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
          <DragList />
        </div>
        <div className="flex justify-end items-start gap-5">
          <button onClick={AddHandle}>
            <IoMdAddCircle className="w-10 h-10" />
          </button>
          <button onClick={MinusHandle}>
            <FaMinusCircle className="w-[32px] h-[32px]" />
          </button>
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
          onClick={() => router.push("carrera/simular")}
        >
          <p className="text-sm md:text-base lg:text-xl">Crear</p>
        </Button>
      </div>
    </>
  );
};