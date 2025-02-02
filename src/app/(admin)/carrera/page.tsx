"use client";
import React, { useState } from "react";
import { DragList } from "@/components/CardDrop/DragList";
import { Title } from "@/components/reusable/title";
import { IoSearch } from "react-icons/io5";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { Button, Input } from "@nextui-org/react";
import { TipoEtapas } from "@/components/reusable/admin/TipoEtapas";
import { IoMdAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Carrera() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const AddHandle = (e: any) => {
    router.push("/director/creacionEquipo");
  };
  const MinusHandle = (e: any) => { };

  const [NumEtapas, setNumEtapas] = useState(1);
  const MinusEtapaHandle = (e: any) => {
    setNumEtapas(NumEtapas - 1);
  };
  const AddEtapaHandle = (e: any) => {
    setNumEtapas(NumEtapas + 1);
  };
  return (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <Title className="text-center" mesage="CREACION DE CARRERA" />
        <div className="grid grid-cols-2 gap-5">
          <Title className="" mesage="EQUIPOS" />
          <div className="flex justify-end items-center">
            <Input
              className="border-1 border-secondary rounded-default w-1/2"
              type="text"
              placeholder="equipo1"
              radius="full"
              labelPlacement="outside"
              value={search}
              onValueChange={setSearch}
              startContent={<IoSearch className="w-6 h-6" />}
            />
          </div>
        </div>
      </div>
      <CardWrapper className="bg-white p-10">
        <div className="grid gap-x-5 gap-y-5  md:gap-x-10 lg:gap-x-14 grid-cols-2 rounded-default min-w-[400px]">
          <DragList />
          <div className="flex justify-end items-start gap-5">
            <button onClick={AddHandle}>
              <IoMdAddCircle className="w-10 h-10" />
            </button>
            <button onClick={MinusHandle}>
              <FaMinusCircle className="w-[32px] h-[32px]" />
            </button>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col md:block">
              <Title
                className="text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
                mesage="ETAPAS"
              />
              <CardWrapper className="bg-background p-3 md:p-5 lg:p-7 rounded-default border-1 border-secondary shadow-button">
                <div className="grid grid-cols-1 gap-2">

                  {Array.from({ length: NumEtapas }).map((_, index) => (
                    <TipoEtapas key={index} mesage={`ETAPA ${index + 1}`} />
                  ))}

                  <div className="flex justify-end gap-5">
                    <button onClick={AddEtapaHandle}>
                      <IoMdAddCircle className="w-10 h-10" />
                    </button>
                    <button onClick={MinusEtapaHandle}>
                      <FaMinusCircle className="w-[32px] h-[32px]" />
                    </button>
                  </div>
                </div>
              </CardWrapper>
            </div>
          </div>
        </div>
        </CardWrapper>

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

