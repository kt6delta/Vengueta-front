"use client";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import {
  contexturas,
  countries,
  especialidad,
  sexos,
  paises,
  acciones2
} from "@/utils/constantes/data";
import axios from "axios";

type FormData = {
  rol: string;
  email: string;
  nombre: string;
  cedula: string;
  sexo: string;
  contextura: string;
  especialidad: string;
  experiencia: string;
  nacionalidad: string;
  tiempoAcumula: string;
  acciones: { value: string; label: string }[];
  equipos: string;
};
interface IForm {
  handleSubmit(formData: FormData): Promise<boolean>;
}
class Ciclista implements IForm {
  async handleSubmit(formData: FormData): Promise<boolean> {
    const {
      rol,
      nombre,
      cedula,
      sexo,
      contextura,
      especialidad,
      email,
      acciones,
      tiempoAcumula,
      equipos,
    } = formData;
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/ActualizarUsuarioCiclista`,
        {
          idusuario: cedula,
          nombre,
          email,
          sexo: sexo.charAt(0),
          rol_id: rol,
          especialidad_id: especialidad,
          contextura,
          acciones,
          tiempo_acumulado: tiempoAcumula,
          nombreEquipo: equipos,
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        return false; // Ocurrió un error en el back
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      return false; // Ocurrió un error al realizar el fetch
    }
  }
}
class Masajista implements IForm {
  async handleSubmit(formData: FormData): Promise<boolean> {
    const { rol, nombre, cedula, sexo, email, experiencia, equipos } = formData;
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/ActualizarUsuarioMasajista`,
        {
          idusuario: cedula,
          nombre,
          email,
          sexo: sexo.charAt(0),
          rol_id: rol,
          anios_experiencia: experiencia,
          nombreEquipo: equipos,
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        return false; // Ocurrió un error en el back
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      return false; // Ocurrió un error al realizar el fetch
    }
  }
}
class Director implements IForm {
  async handleSubmit(formData: FormData): Promise<boolean> {
    const { rol, nombre, cedula, sexo, email, nacionalidad, equipos } =
      formData;
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/ActualizarUsuarioDirector`,
        {
          idusuario: cedula,
          nombre,
          email,
          sexo: sexo.charAt(0),
          rol_id: rol,
          nacionalidad,
          nombreEquipo: equipos,
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        return false; // Ocurrió un error en el back
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      return false; // Ocurrió un error al realizar el fetch
    }
  }
}

export default function Perfil() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    rol: "",
    email: "",
    nombre: "",
    cedula: "",
    sexo: "",
    contextura: "",
    especialidad: "0",
    experiencia: "",
    nacionalidad: "",
    tiempoAcumula: "0",
    acciones: [{ value: "", label: "" }],
    equipos: "",
  });
  const [form, setForm] = useState<IForm | null>(null);
  const [titulo, setTitulo] = useState("");
  const [equip, setEquip] = useState<string | string[] | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [acciones, setAcciones] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        //hacer la peticion get en base al id
        let rol = localStorage.getItem("rol");
        let response;
        switch (rol) {
          case "1":
            console.log(
              `URL: ${process.env.NEXT_PUBLIC_URL_BACKEND}/usuarios/perfilCiclista`
            );
            // let accionesObject = perfilData.acciones.map((accion: any) => ({
            //   label: accion,
            //   value: accion
            // }));
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_URL_BACKEND}/usuarios/perfilCiclista`,
              {
                idusuario: localStorage.getItem("id"),
              }
            );
            response = response.data;
            break;
          case "2":
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_URL_BACKEND}/usuarios/perfilMasajista`,
              {
                idusuario: localStorage.getItem("id"),
              }
            );
            response = response.data;
            break;
          case "3":
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_URL_BACKEND}/usuarios/perfilDirector`,
              {
                idusuario: localStorage.getItem("id"),
              }
            );
            response = response.data;
            break;
        }
        // Suponiendo que la respuesta tiene la estructura esperada para llenar formData
        const perfilData = response;
        // console.log(accionesObject);
        setFormData({
          rol: perfilData.rol_id.toString(),
          email: perfilData.email,
          nombre: perfilData.nombre,
          cedula: perfilData.idusuario.toString(),
          sexo: perfilData.sexo === "M" ? "Masculino" : "Femenino",
          contextura: perfilData.contextura || "",
          especialidad: perfilData.especialidad_id?.toString() || "0",
          experiencia: perfilData.anios_experiencia || "",
          nacionalidad: perfilData.nacionalidad || "",
          tiempoAcumula: perfilData.tiempoAcumula || "0",
          acciones: acciones2 || [{ value: "", label: "" }],
          equipos: perfilData.equipos || [""], // un array de strings con los nombres de equipos
        });
        // console.log(formData.acciones);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchPerfil();
    // Cambiar la estrategia según el rol
    switch (formData.rol) {
      case "1":
        setTitulo("CICLISTA");
        setEquip(formData.equipos);
        setForm(new Ciclista());
        break;
      case "2":
        setTitulo("MASAJISTA");
        setEquip(null);
        setForm(new Masajista());
        break;
      case "3":
        setTitulo("DIRECTOR");
        setEquip(formData.equipos);
        setForm(new Director());
        break;
      default:
        setForm(null);
    }
  }, [formData.rol, formData.equipos, setTitulo, setEquip]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isReadOnly == false) {
      if (form) {
        await form.handleSubmit(formData);
        setIsReadOnly(!isReadOnly);
        toast.success("Datos actualizados");
      } else {
        toast.error("Rol no valido");
      }
    } else {
      setIsReadOnly(!isReadOnly);
      toast.info("Editando Datos");
    }
  };
  const handleChange = (e: any, value?: string) => {
    if (value !== undefined) {
      setFormData((prevState) => ({
        ...prevState,
        sexo: value,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="relative z-50 mb-0 md:mb-8 lg:mb-12">
        <h1 className="absolute left-0 text-secondary text-base md:text-xl xl:text-2xl font-bold px-[60px]">
          {titulo}
        </h1>
        <div className="absolute -top-20 left-0 right-0">
          <div className="hidden justify-center items-center sm:flex">
            <Avatar
              isBordered
              color="danger"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"
            />
          </div>
        </div>
        <h1 className="absolute right-0 text-secondary text-base md:text-xl xl:text-2xl font-bold text-right px-[60px]">
          {equip}
        </h1>
      </div>
      <form className="w-full p-10 grid my-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <Button
            color="secondary"
            variant="solid"
            type="submit"
            radius="full"
            className="w-1/3 min-w-32 mb-2 text-white"
          >
            {isReadOnly == true ? "Editar Perfil" : "Guardar Perfil"}
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 p-5">
          {/* inputs */}
          <Input
            isReadOnly={isReadOnly}
            isRequired={true}
            type="email"
            variant="underlined"
            label="Correo"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
            classNames={{
              base: "font-bold",
            }}
          />
          <Input
            isReadOnly={isReadOnly}
            isRequired={true}
            type="text"
            variant="underlined"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Juan Diego"
            classNames={{
              base: "font-bold",
            }}
          />
          <Input
            isReadOnly={true}
            isRequired={true}
            variant="underlined"
            label="cedula"
            placeholder="1111111111"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            type="number"
            classNames={{
              base: "font-bold",
            }}
          />
          <div
            className={`flex flex-col gap-xs w-full
                          md:flex md:gap-xs`}
          >
            <p className="tracking-tight text-foreground-600 font-bold ml-1 text-sm pe-2 max-w-full text-ellipsis">
              Sexo <span className="text-danger">*</span>
            </p>
            <div
              className={`flex justify-center w-full
                          md:flex md:gap-xs`}
            >
              {sexos!.map((option, indexOption) => (
                <div key={indexOption} className="w-1/2 mx-4">
                  <label
                    key={indexOption}
                    htmlFor={`${indexOption}`}
                    tabIndex={0}
                    className={`flex items-center justify-center text-small text-secondary font-light py-3 px-4 border-1 border-secondary rounded-default cursor-pointer w-full text-center 
                      transition-all ease-in-out duration-300 
                      ${formData.sexo === option ? "bg-primary text-white" : ""} 
                      outline-secondary`}
                    onKeyDown={(event) =>
                      !isReadOnly &&
                      event.key === "Enter" &&
                      handleChange(undefined, option)
                    }
                  >
                    {option}
                    <input
                      type="radio"
                      hidden
                      id={`${indexOption}`}
                      name="sexo"
                      value={option}
                      onChange={() => handleChange(undefined, option)}
                      checked={formData.sexo === option}
                      disabled={isReadOnly}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {(() => {
            if (formData.rol === "1") {
              return (
                <>
                  {/* Componentes para ciclista */}
                  <Autocomplete
                    isReadOnly={isReadOnly}
                    label="Especialidad"
                    color="secondary"
                    variant="underlined"
                    size="md"
                    radius="md"
                    placeholder="Seleccione una Especialidad"
                    defaultItems={especialidad}
                    defaultSelectedKey={formData.especialidad}
                    onSelectionChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        especialidad: value as string,
                      }))
                    }
                    classNames={{
                      base: "font-bold",
                    }}
                  >
                    {especialidad.map((option) => (
                      <AutocompleteItem
                        key={option.value}
                        value={option.label}
                        classNames={{
                          selectedIcon: "text-secondary",
                        }}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <Autocomplete
                    isReadOnly={isReadOnly}
                    label="Contextura"
                    color="secondary"
                    variant="underlined"
                    size="md"
                    radius="md"
                    placeholder="Seleccione un Rol"
                    defaultItems={contexturas}
                    defaultSelectedKey={formData.contextura}
                    onSelectionChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        contextura: value as string,
                      }))
                    }
                    classNames={{
                      base: "font-bold",
                    }}
                  >
                    {contexturas.map((option) => (
                      <AutocompleteItem
                        key={option.value}
                        value={option.label}
                        classNames={{
                          selectedIcon: "text-secondary",
                        }}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <Autocomplete
                    isReadOnly={isReadOnly}
                    label="Acciones"
                    color="secondary"
                    variant="underlined"
                    size="md"
                    radius="md"
                    placeholder="Seleccione un Rol"
                    defaultItems={formData.acciones}
                    defaultSelectedKey={formData.acciones[0].value}
                    onSelectionChange={(value) => setAcciones(value as string)}
                    classNames={{
                      base: "font-bold",
                    }}
                  >
                    {formData.acciones.map((option) => (
                      <AutocompleteItem
                        key={option.value}
                        value={option.label}
                        classNames={{
                          selectedIcon: "text-secondary",
                        }}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Input
                    isReadOnly={isReadOnly}
                    variant="underlined"
                    type="number"
                    label="Experiencia"
                    placeholder="10.25"
                    name="experiencia"
                    value={formData.tiempoAcumula.toString()}
                    onChange={handleChange}
                    classNames={{
                      base: "font-bold",
                    }}
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          Horas
                        </span>
                      </div>
                    }
                  />
                </>
              );
            } else if (formData.rol === "2") {
              return (
                <Input
                  isReadOnly={isReadOnly}
                  isRequired={true}
                  variant="underlined"
                  label="Experiencia"
                  placeholder="20 años"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  type="number"
                  classNames={{
                    base: "font-bold",
                  }}
                />
              );
            } else if (formData.rol === "3") {
              return (
                <Autocomplete
                  isReadOnly={isReadOnly}
                  label="Nacionalidad"
                  color="secondary"
                  variant="underlined"
                  size="md"
                  radius="md"
                  placeholder="Seleccione un Nacionalidad"
                  defaultItems={paises}
                  onSelectionChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      nacionalidad: value as string,
                    }))
                  }
                  classNames={{
                    base: "font-bold",
                  }}
                >
                  {countries.map((option: string) => (
                    <AutocompleteItem
                      key={option}
                      value={option}
                      classNames={{
                        selectedIcon: "text-secondary",
                      }}
                    >
                      {option}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              );
            }
          })()}
        </div>
      </form>
    </>
  );
}
