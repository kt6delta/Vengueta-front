"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { DraggableElement } from "@/components/CardDrop/DraggableElement";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo, TodosStatus } from "@/utils/interfaces/types";
import { img } from "@/utils/constantes/data";


export const DragList = () => {

  let DISPONIBLES = [
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
  let AGREGADOS = [
    {
      id: 4,
      nombre: "Cata Preci",
      especialidad: "sprinter",
      genero: "Femenino",
      contextura: "delgada",
      tiempo: "10",
    },
    {
      id: 5,
      nombre: "Cata Preci",
      especialidad: "sprinter",
      genero: "Femenino",
      contextura: "delgada",
      tiempo: "10",
    },
  ];
  const [DropID1, setDropID1] = useState(
    TodosStatus.DisponiblesTodos as string
  );
  const [DropID2, setDropID2] = useState(TodosStatus.AgregadosTodos as string);
  const [disponiblesTodos, setDisponiblesTodos] = useState<Todo[]>([]);
  const [agregadosTodos, setAgregadosTodos] = useState<Todo[]>([]);

  const [hijosMontados, setHijosMontados] = useState(0);
  useEffect(() => {
    if (hijosMontados === 1 || hijosMontados === 2) {
      DISPONIBLES = DISPONIBLES.map((item) => ({
        ...item,
        img: img[Math.floor(Math.random() * img.length)],
      }));
      setDisponiblesTodos(DISPONIBLES);
      setAgregadosTodos(AGREGADOS);
      setDropID1(TodosStatus.DisponiblesTodos.toLowerCase());
      setDropID2(TodosStatus.AgregadosTodos.toLowerCase());
    }
  }, [hijosMontados]);

  const notificarMontaje = (num: number) => {
    setHijosMontados(num);
  };

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add,
      disponibles = disponiblesTodos,
      agregados = agregadosTodos;
    switch (source.droppableId) {
      case DropID1:
        add = disponiblesTodos[source.index];
        disponibles.splice(source.index, 1);
        break;
      case DropID2:
        add = agregadosTodos[source.index];
        agregados.splice(source.index, 1);
        break;
    }

    if (add) {
      switch (destination.droppableId) {
        case DropID1:
          disponibles.splice(destination.index, 0, add);
          break;
        case DropID2:
          agregados.splice(destination.index, 0, add);
          break;
      }
    }

    setDisponiblesTodos(disponibles);
    setAgregadosTodos(agregados);

    if (window) {
      window.localStorage.setItem(
        "DisponiblesTodos",
        JSON.stringify(disponibles)
      );
      window.localStorage.setItem("AgregadosTodos", JSON.stringify(agregados));
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <DraggableElement
          DropID1={DropID1}
          DropID2={DropID2}
          disponiblesTodos={disponiblesTodos}
          setDisponiblesTodos={setDisponiblesTodos}
          agregadosTodos={agregadosTodos}
          setAgregadosTodos={setAgregadosTodos}
          onMontado={notificarMontaje}
        />
      </DragDropContext>
    </>
  );
};