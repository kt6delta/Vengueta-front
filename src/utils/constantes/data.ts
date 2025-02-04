import { getNames } from 'country-list';

export const countries = getNames();
export const paises = countries.map((countryName) => ({
  label: countryName,
  value: countryName,
}));

export const masajista = [
  { label: "Masajista1", value: "1" },//cedula
  { label: "Masajista2", value: "2" },
  { label: "Masajista3", value: "3" }
];



export const horas = [
  { label: "00:00", value: "0" },
  { label: "01:00", value: "1" },
  { label: "02:00", value: "2" },
  { label: "03:00", value: "3" },
  { label: "04:00", value: "4" },
  { label: "05:00", value: "5" },
  { label: "06:00", value: "6" },
  { label: "07:00", value: "7" },
  { label: "08:00", value: "8" },
  { label: "09:00", value: "9" },
  { label: "10:00", value: "10" },
  { label: "11:00", value: "11" },
  { label: "12:00", value: "12" },
  { label: "13:00", value: "13" },
  { label: "14:00", value: "14" },
  { label: "15:00", value: "15" },
  { label: "16:00", value: "16" },
  { label: "17:00", value: "17" },
  { label: "18:00", value: "18" },
  { label: "19:00", value: "19" },
  { label: "20:00", value: "20" },
  { label: "21:00", value: "21" },
  { label: "22:00", value: "22" },
  { label: "23:00", value: "23" },
];

export const rol = [
  { label: "Ciclista", value: "1" },
  { label: "Masajista", value: "2" },
  { label: "Director", value: "3" }
];

export const sexos = ["Masculino", "Femenino"];

export const etapas = [
  { label: "Montaña", value: "montaña" },
  { label: "llano con curvas", value: "llano con curvas" },
  { label: "semi llano", value: "semi llano" },
  { label: "llano recta", value: "llano recta" }
];

export const contexturas = [
  { label: "muy delgada", value: "muy delgada" },
  { label: "delgada", value: "delgada" },
  { label: "media", value: "media" },
  { label: "corpulenta", value: "corpulenta" },
  { label: "muy corpulenta", value: "muy corpulenta" }
]

export const especialidad = [
  { label: "Escaladores", value: "1", recomendar: "se recomienda contextura muy delgada" },
  { label: "Contrarelojistas", value: "6", recomendar: "se recomienda contextura delgada" },
  { label: "Gregarios", value: "4", recomendar: "se recomienda contextura media" },
  { label: "Clasicomanos", value: "5", recomendar: "se recomienda contextura media" },
  { label: "Rodadores", value: "2", recomendar: "se recomienda contextura corpulenta" },
  { label: "Sprinters", value: "3", recomendar: "se recomienda contextura muy corpulenta" },
];

export const img = [
  "https://i.pravatar.cc/150?u=a04258a2462d826712d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026302d",
  "",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
]


export const acciones2 = [
  { label: "Pedaleo", value: "1" }
];


const columns = [
  {name: "PAIS", uid: "pais"},
  {name: "ID", uid: "id", sortable: true},
  {name: "EQUIPO", uid: "equipo", sortable: true},
  {name: "DIRECTOR", uid: "director", sortable: true},
  {name: "TIEMPO", uid: "tiempo", sortable: true},
  {name: "MASAJISTA", uid: "masajista"},
];

//tabla
const users = [
  {
    id: 1,
    equipo: "Tony Reichert",
    tiempo: 3600,
    pais: "Argentina",
    director: "director (1)",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    masajista: "masajista 1",
  },
  {
    id: 2,
    equipo: "Zoey Lang",
    tiempo: 7200,
    pais: "Brazil",
    director: "director (2)",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    masajista: "masajista 2",
  },
  {
    id: 3,
    equipo: "Jane Fisher",
    tiempo: 5400,
    pais: "Chile",
    director: "director (3)",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    masajista: "masajista 3",
  },
  {
    id: 4,
    equipo: "William Howard",
    tiempo: 4800,
    pais: "Colombia",
    director: "director (4)",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    masajista: "masajista 4",
  },
  {
    id: 5,
    equipo: "Kristen Copper",
    tiempo: 6600,
    pais: "Peru",
    director: "director (5)",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    masajista: "masajista 5",
  },
  {
    id: 6,
    equipo: "Brian Kim",
    tiempo: 4500,
    pais: "Mexico",
    director: "director (6)",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    masajista: "masajista 6",
  },
  {
    id: 7,
    equipo: "Michael Hunt",
    tiempo: 3900,
    pais: "Venezuela",
    director: "director (7)",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    masajista: "masajista 7",
  },
  {
    id: 8,
    equipo: "Samantha Brooks",
    tiempo: 5700,
    pais: "Uruguay",
    director: "director (8)",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    masajista: "masajista 8",
  },
  {
    id: 9,
    equipo: "Frank Harrison",
    tiempo: 6300,
    pais: "Paraguay",
    director: "director (9)",
    avatar: "https://i.pravatar.cc/150?img=4",
    masajista: "masajista 9",
  },
  {
    id: 10,
    equipo: "Emma Adams",
    tiempo: 6000,
    pais: "Bolivia",
    director: "director (10)",
    avatar: "https://i.pravatar.cc/150?img=5",
    masajista: "masajista 10",
  },
  {
    id: 11,
    equipo: "Brandon Stevens",
    tiempo: 4200,
    pais: "Ecuador",
    director: "director (11)",
    avatar: "https://i.pravatar.cc/150?img=8",
    masajista: "masajista 11",
  },
  {
    id: 12,
    equipo: "Megan Richards",
    tiempo: 4800,
    pais: "Guatemala",
    director: "director (12)",
    avatar: "https://i.pravatar.cc/150?img=10",
    masajista: "masajista 12",
  },
  {
    id: 13,
    equipo: "Oliver Scott",
    tiempo: 5400,
    pais: "Costa Rica",
    director: "director (13)",
    avatar: "https://i.pravatar.cc/150?img=12",
    masajista: "masajista 13",
  },
  {
    id: 14,
    equipo: "Grace Allen",
    tiempo: 3600,
    pais: "Honduras",
    director: "director (14)",
    avatar: "https://i.pravatar.cc/150?img=16",
    masajista: "masajista 14",
  },
  {
    id: 15,
    equipo: "Noah Carter",
    tiempo: 3000,
    pais: "Nicaragua",
    director: "director (15)",
    avatar: "https://i.pravatar.cc/150?img=15",
    masajista: "masajista 15",
  },
  {
    id: 16,
    equipo: "Ava Perez",
    tiempo: 3900,
    pais: "El Salvador",
    director: "director (16)",
    avatar: "https://i.pravatar.cc/150?img=20",
    masajista: "masajista 16",
  },
  {
    id: 17,
    equipo: "Liam Johnson",
    tiempo: 4200,
    pais: "Panama",
    director: "director (17)",
    avatar: "https://i.pravatar.cc/150?img=33",
    masajista: "masajista 17",
  },
  {
    id: 18,
    equipo: "Sophia Taylor",
    tiempo: 4500,
    pais: "Puerto Rico",
    director: "director (18)",
    avatar: "https://i.pravatar.cc/150?img=29",
    masajista: "masajista 18",
  },
  {
    id: 19,
    equipo: "Lucas Harris",
    tiempo: 4800,
    pais: "France",
    director: "director (19)",
    avatar: "https://i.pravatar.cc/150?img=50",
    masajista: "masajista 19",
  },
  {
    id: 20,
    equipo: "Mia Robinson",
    tiempo: 5100,
    pais: "Puerto Rico",
    director: "director (20)",
    avatar: "https://i.pravatar.cc/150?img=45",
    masajista: "masajista 20",
  },
];

export {columns, users};