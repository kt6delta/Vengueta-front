"use client";
import { Input, Button } from "@nextui-org/react";
import React, { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

//patron estrategia
interface IForm {
  handleSubmit(formData: any): Promise<string>;
}
class Ciclista implements IForm {
  async handleSubmit(formData: any): Promise<string> {
    const { rol, nombre, cedula, sexo, contextura, especialidad, email } =
      formData;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/usuarios/crearUsuarioCiclista`,
        {
          idusuario: cedula,
          nombre,
          email,
          sexo: sexo.charAt(0),
          rol_id: rol,
          especialidad_id: especialidad,
          contextura,
        }
      );
      return response.data.idusuario;
    } catch {
      toast.error("Oops! errror en la creacion de usuario");
      return "";
    }
  }
}
class Masajista implements IForm {
  async handleSubmit(formData: any): Promise<string> {
    const { rol, nombre, cedula, sexo, email, experiencia } = formData;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/usuarios/crearUsuarioMasajista`,
        {
          idusuario: cedula,
          nombre,
          email,
          sexo: sexo.charAt(0),
          rol_id: rol,
          anios_experiencia: experiencia,
        }
      );
      return response.data.idusuario;
    } catch {
      toast.error("Oops! errror en la creacion de usuario");
      return "";
    }
  }
}
class Director implements IForm {
  async handleSubmit(formData: any): Promise<string> {
    const { rol, nombre, cedula, sexo, email, nacionalidad } = formData;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/usuarios/crearUsuarioDirector`,
        {
          idusuario: cedula,
          nombre,
          email,
          sexo: sexo.charAt(0),
          rol_id: rol,
          nacionalidad,
        }
      );
      return response.data.idusuario;
    } catch {
      toast.error("Oops! errror en la creacion de usuario");
      return "";
    }
  }
}

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    rol: "",
    nombre: "",
    cedula: "",
    sexo: "",
    contextura: "",
    especialidad: "",
    email: "",
    experiencia: "",
    nacionalidad: "",
  });
  const [form, setForm] = useState<IForm | null>(null);

  useEffect(() => {
    // Cambiar la estrategia según el rol
    switch (formData.rol) {
      case "1":
        setForm(new Ciclista());
        break;
      case "2":
        setForm(new Masajista());
        break;
      case "3":
        setForm(new Director());
        break;
      default:
        setForm(null);
    }
  }, [formData.rol]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form) {
      const response = await form.handleSubmit(formData);
      toast.success("Login exitoso");
      localStorage.setItem("id", response);
      router.push("/login");
    } else {
      console.log("rol no valido");
      toast.error("Oops! rol no valido!");
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
      <form className="w-full p-10 grid gap-4 my-auto" onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary text-3xl font-semibold">
          Registrarse
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-flow-cols-3">
          <div className="flex w-full flex-col md:flex-nowrap gap-4">
            <div
              className="md:flex-nowrap 
          p-5 flex w-full flex-col gap-4"
            >
              {/* inputs */}
              <Input
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
						</div>
					</div>
					<div className="flex w-full flex-col md:flex-nowrap gap-4">
						<div
							className="md:flex-nowrap 
          p-5 flex w-full flex-col gap-4"
            >
              {/* inputs */}
              <Input
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
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Button
            color="secondary"
            variant="solid"
            type="submit"
            radius="full"
            className="w-1/5 min-w-32 mb-2 text-white"
          >
            Registrarse
          </Button>
          <p className="text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary underline font-bold">
              Ingresar
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
