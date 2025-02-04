import React, { FC, Dispatch, SetStateAction,useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ListItem } from "@/components/CardDrop/ListItem";
import { Todo } from "@/utils/interfaces/types";
import { Title } from "../reusable/title";

interface Props {
  DropID1: string;
  DropID2: string;
  disponiblesTodos: Todo[];
  setDisponiblesTodos: Dispatch<SetStateAction<Todo[]>>;
  agregadosTodos: Todo[];
  setAgregadosTodos: Dispatch<SetStateAction<Todo[]>>;
  onMontado: any;
}

export const DraggableElement: FC<Props> = ({
  DropID1,
  DropID2,
  disponiblesTodos,
  setDisponiblesTodos,
  agregadosTodos,
  setAgregadosTodos,
  onMontado,
}) => {
  useEffect(() => {
    onMontado(1);
  }, []);
  return (
    <>
      <div>
        <Title
          className="text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
          mesage="DISPONIBLES"
        />

        <div className="bg-[#FAFAFA] p-3 md:p-5 lg:p-7 rounded-default border-2 border-[rgba(0, 53, 61, 0.4)] shadow-button">
          <Droppable droppableId={DropID1}>
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {disponiblesTodos?.map((todo, index) => (
                  <ListItem
                    index={index}
                    key={todo?.id}
                    todo={todo}
                    todos={disponiblesTodos}
                    setTodos={setDisponiblesTodos}
                    onMontado={onMontado}
                  />
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>

      <div>
        <Title
          className="text-center text-small sm:text-small md:text-small lg:text-xl xl:text-xl"
          mesage="RECURSOS"
        />
        <div className="bg-[#FAFAFA] p-3 md:p-5 lg:p-7 rounded-default border-2 border-[rgba(0, 53, 61, 0.4)] shadow-button">
          <Droppable droppableId={DropID2}>
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {agregadosTodos?.map((todo, index) => (
                  <ListItem
                    index={index}
                    key={todo?.id}
                    todo={todo}
                    todos={agregadosTodos}
                    setTodos={setAgregadosTodos}
                    onMontado={onMontado}
                  />
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </>
  );
};