"use client";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Input } from "@nextui-org/react";
import axios from "axios";

type FormData = {
  rol: string;
  email: string;
  nickname: string;
  password: string;
};

interface IForm {
  handleSubmit(formData: FormData): Promise<boolean>;
}

//actualizar perfil
class UsuarioUpdate implements IForm {
  async handleSubmit(formData: FormData): Promise<boolean> {
    const { rol, nickname, password, email } = formData;

    const userId = localStorage.getItem("user_id"); //por defecto de la base de datos
    const token = localStorage.getItem("auth_token");

    if (!userId || !token) {
      toast.error("No se encontró la información del usuario. Inicia sesión nuevamente.");
      return false;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${userId}`, // Se usa el ID en la URL
        { username: nickname, email, rol, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //token que pide el back
          },
        }
      );

      if (response.status === 200) {
        toast.success("Usuario actualizado correctamente");
        return true;
      } else {
        toast.error("Error al actualizar el usuario");
        return false;
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      toast.error("Error al actualizar el usuario");
      return false;
    }
  }
}

export default function Perfil() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    rol: "",
    email: "",
    nickname: "",
    password: "",
  });

  const [form, setForm] = useState<IForm | null>(null);
  const [titulo, setTitulo] = useState<string>("Cargando...");
  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("auth_token");

        if (!userId || !token) {
          toast.error("No se encontró la información del usuario. Inicia sesión nuevamente.");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Enviar el token en la petición
            },
          }
        );

        const perfilData = response.data;
        console.log("Datos recibidos:", perfilData);

        setFormData({
          rol: perfilData.rol,
          email: perfilData.email,
          nickname: perfilData.username,
          password: perfilData.password,
        });

        setTitulo(perfilData.username || "Usuario");
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        toast.error("Error al cargar el perfil.");
      }
    };

    fetchPerfil();
    setForm(new UsuarioUpdate());
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isReadOnly && form) {
      const result = await form.handleSubmit(formData);
      if (result) {
        toast.success("Datos actualizados");
      }
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
      toast.info("Editando Datos");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="relative z-50 mb-0 md:mb-8 lg:mb-12">
        <h1 className="relative text-secondary text-xl font-bold px-[60px]">
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
            {isReadOnly ? "Editar Perfil" : "Guardar Perfil"}
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 p-5">
          <Input
            isReadOnly={isReadOnly}
            isRequired
            type="email"
            variant="underlined"
            label="Correo"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
            classNames={{ base: "font-bold" }}
          />
          <Input
            isReadOnly={isReadOnly}
            isRequired
            type="text"
            variant="underlined"
            label="Nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Juan123"
            classNames={{ base: "font-bold" }}
          />
          <Input
            isReadOnly={isReadOnly}
            isRequired
            type="password"
            variant="underlined"
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            classNames={{ base: "font-bold" }}
          />
        </div>
      </form>
    </>
  );
}
