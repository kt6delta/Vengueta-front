"use client";
import React, { useState } from "react";
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CardUser } from "@/components/reusable/user/cardUser";

export default function Ganador() {
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
  let GANADOR = [
    {
      id: 1, //cedula
      nombre: "Cata Preci",
      especialidad: "sprinter",
      genero: "Femenino",
      contextura: "delgada",
      tiempo: "10",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <Title className="text-center" mesage="GANADOR DE ETAPA" />
      </div>
      <div className="grid gap-x-5 gap-y-5 grid-flow-row md:grid-flow-col md:gap-x-10 lg:gap-x-14 rounded-default min-w-[400px]">
        <div className="my-auto">
          <div className="flex flex-col md:block">
            <Title
              className="text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
              mesage="CICLISTA"
            />
            <CardWrapper className="bg-background p-3 md:p-5 lg:p-7 rounded-default border-1 border-content1 shadow-button">
              <div className="grid grid-cols-1 gap-2">
              {GANADOR.map((miembro) => (
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
        <div>
          <Title
            className="text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
            mesage="EQUIPO"
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
      <div className="flex flex-col items-center mt-5">
        <Button
          color="secondary"
          variant="solid"
          type="submit"
          radius="full"
          className="w-1/3 min-w-32 mb-2 bg-secondary text-white"
          onClick={() => router.push("/carrera/tablaResultados")}
        >
          Continuar
        </Button>
      </div>
    </>
  );
}
