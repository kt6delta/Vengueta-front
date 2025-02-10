"use client";
import { Input, Button } from "@nextui-org/react";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

// Patrón estrategia
interface IForm {
  handleSubmit(formData: any): Promise<string>;
}

class Usuario implements IForm {
  async handleSubmit(formData: any): Promise<string> {
    const { username, email, password } = formData;
    try {
      const response = await axios.post( //se supone que con este endpoint se envía la información
        `
        `,
        {
          username, 
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data === "User registered successfully!") {
        return "success";
      }
      return "";
    } catch (error) {
      toast.error("Oops! Error en la creación de usuario");
      return "";
    }
  }
}

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const form = new Usuario();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await form.handleSubmit(formData);
    if (response === "success") {
      toast.success("Registro exitoso");
      router.push(`${process.env.NEXT_PUBLIC_API_URL_BACKEND}/login`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form 
      className="w-full max-w-md mx-auto p-10 flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-secondary text-3xl font-semibold">
        Registrarse
      </h1>

      <div className="flex flex-col gap-4">
        <Input
          isRequired
          variant="underlined"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Andrea567"
        />
        <Input
          isRequired
          type="email"
          variant="underlined"
          label="Correo"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tucorreo@ejemplo.com"
        />
        <Input
          isRequired
          type="password"
          variant="underlined"
          label="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
        />
      </div>

      <div className="flex flex-col items-center">
        <Button
          color="secondary"
          variant="solid"
          type="submit"
          radius="full"
          className="w-1/3 min-w-32 mb-2 text-white"
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
  );
}
