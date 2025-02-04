import { SVGProps } from "react";

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
interface ISelectedEntity {
  iNo: string;
  linearizationUri: string;
  foundationUri: string;
  code: string;
  title: string;
  selectedText: string;
  searchQuery?: string;
}

interface IFormSlice {
  formAnswersMap: {
    [key: string]: any
  }
  setFormAnswer: (field: string, answer: any) => void
}

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

type ListType = {
  id: number;
  nombre: string;
  especialidad: string;
  genero: string;
  contextura: string;
  tiempo: string;
}[];

type Lists = {
  [key: string]: ListType;
  DISPONIBLES: ListType;
  AGREGADOS: ListType;
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
  IFormSlice,
  ISelectedEntity,
  IconSvgProps,
  Todo,
  DraggableElementProp,
  Lists,
}