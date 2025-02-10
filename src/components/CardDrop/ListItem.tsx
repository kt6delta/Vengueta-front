import React, {
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent
} from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardUser } from "@/components/reusable/user/cardUser";
import { Todo } from "@/utils/interfaces/types";
// import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
// import { MdDeleteOutline } from "react-icons/md";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  onMontado: any;
}

export const ListItem: FC<Props> = ({ index, todo, todos, setTodos, onMontado }) => {
  const router = useRouter();
  // const handleEdit = (e: any) => {
  //   console.log("edit");
  //   router.push(`carrera/infoEquipo`);
  // };

  // const handleDelete = (e: any) => {
  //   setTodos(todos.filter((item) => item.id !== todo.id));
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`carrera/simular`);
  }
  useEffect(() => {
    onMontado(2);
  }, []);
  return (
    <>
      <Draggable draggableId={index.toString()} index={index} key={index}>
        {(draggableProvided, draggableSnapshot) => (
          <form
            className="mb-3 md:mb-5 lg:mb-7 grid"
            onSubmit={handleSubmit}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
          >
            <CardUser
              nombre={todo.nombre}
              especialidad={todo.especialidad}
              img={todo.img} //random img 0-4
            />
            {/* <div className="flex justify-end gap-2">
              <button type="button" onClick={handleEdit}>
                <FaPencilAlt />
              </button>
              <button type="button" onClick={handleDelete} >
              <MdDeleteOutline className="w-6 h-6"/>
              </button>
            </div> */}
          </form>
        )}
      </Draggable>
    </>
  );
};
