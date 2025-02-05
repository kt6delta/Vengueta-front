
//CardDrop
type Todo = {
  id: number; //cedula
  nombre: string;
  especialidad?: string;
  genero?: string;
  contextura?: string;
  tiempo?: string;
  img?: string;
};


type DraggableElementProp = {
  prefix?: string;
  elements: Array<Todo>;
};

//funciona
export enum TodosStatus {
  DisponiblesTodos = 'DISPONIBLES',
  AgregadosTodos = 'AGREGADOS'
}

export type {
  Todo,
  DraggableElementProp,
}