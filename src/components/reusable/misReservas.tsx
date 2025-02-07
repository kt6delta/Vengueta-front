import React, { useState, useEffect } from "react"; 
import { Title } from "@/components/reusable/title";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { Button } from "@nextui-org/react";

export default function MisReservas() {
  // Datos de ejemplo
  const reservasActivas = [
    { id: 1, recurso: "Recurso 1", horario: "Lunes 8AM - 10AM" },
    { id: 2, recurso: "Recurso 2", horario: "Lunes 8AM - 10AM" },
    { id: 3, recurso: "Recurso 3", horario: "Lunes 8AM - 10AM" },
  ];

  const reservasVencidas = [
    { id: 1, recurso: "Recurso 1", horario: "Lunes 8AM - 10AM" },
    { id: 2, recurso: "Recurso 2", horario: "Lunes 8AM - 10AM" },
    { id: 3, recurso: "Recurso 3", horario: "Lunes 8AM - 10AM" },
  ];

  return (
    <div className="flex items-center justify-center bg-white p-1">
      <div className="flex flex-col w-full max-w-5xl min-w-[400px] gap-3 mx-5"> 
        <Title className="text-center text-2xl font-bold mb-2" mesage="RESERVAS" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <CardWrapper className="p-5 rounded-lg shadow-lg border">
            <h2 className="text-lg font-semibold text-center mb-4">Activas</h2>
            <div className="grid grid-cols-1 gap-3">
              {reservasActivas.map((reserva) => (
                <div key={reserva.id} className="flex items-center gap-3 bg-blue-100 p-3 rounded-lg">
                  <span className="bg-blue-900 text-white p-2 rounded-full">👤</span>
                  <div>
                    <p className="font-semibold">{reserva.recurso}</p>
                    <p className="text-sm text-gray-600">{reserva.horario}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>

          <CardWrapper className="p-5 rounded-lg shadow-lg border">
            <h2 className="text-lg font-semibold text-center mb-4">Vencidas</h2>
            <div className="grid grid-cols-1 gap-3">
              {reservasVencidas.map((reserva) => (
                <div key={reserva.id} className="flex items-center gap-3 bg-blue-100 p-3 rounded-lg">
                  <span className="bg-blue-900 text-white p-2 rounded-full">👤</span>
                  <div>
                    <p className="font-semibold">{reserva.recurso}</p>
                    <p className="text-sm text-gray-600">{reserva.horario}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>

        <div className="flex justify-center">
          <Button
            style={{
              display: "inline-block",    
              paddingLeft: '1rem',        
              paddingRight: '1rem',       
              paddingTop: '0.5rem',       
              paddingBottom: '0.5rem',    
              backgroundColor: '#2563EB', 
              color: "#fff",              
            }}
            className="mt-8"
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
}
