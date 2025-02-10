import React from "react";
import { Card, Image } from "@nextui-org/react";

type CardUserProps = {
  nombre: string;
  especialidad?: string;
  tiempoAcomulado?: string;
  genero?: string;
  contextura?: string;
  img?: string;
};

export const CardUser = ({
  nombre,
  especialidad='',
  tiempoAcomulado = '',
  genero = '',
  contextura = '',
  img = '/casa2.png',
}: CardUserProps) => {
  return (
    <>
      <div className="md:text-left">
        <Card className="p-2 w-full grid grid-flow-row md:grid-flow-col gap-2 bg-secondary-100">
          <div className="flex items-center justify-center">
            <Image
              alt="Card background"
              className="object-cover rounded-full"
              src={img}
              width={70}
              height={70}
            />
          </div>
          <div className="grid">
            <p className="font-bold text-small md:text-medium text-center">
              {nombre}
            </p>
            <div className="grid grid-flow-col gap-2">
              <div>
                <p className="text-black text-sm md:text-[14px] text-center md:text-left font-semibold">
                  {especialidad}
                </p>
                <p className="text-black text-sm md:text-[14px] text-center md:text-left">
                  {tiempoAcomulado}
                </p>
              </div>
              <div>
                <p className="text-black text-sm md:text-[14px] text-center md:text-left">
                  {genero}
                </p>
                <p className="text-black text-sm md:text-[14px] text-center md:text-left">
                  {contextura}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
