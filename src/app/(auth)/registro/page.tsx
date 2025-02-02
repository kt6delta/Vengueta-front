"use client";
import { Input, Button } from "@nextui-org/react";
import React, { FormEvent, useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  rol,
  paises,
  countries,
  contexturas,
  especialidad,
  sexos,
} from "@/utils/constantes/data";

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
              <Autocomplete
                label="Rol"
                color="secondary"
                variant="underlined"
                size="md"
                radius="md"
                isRequired={true}
                placeholder="Seleccione un Rol"
                defaultItems={rol}
                onSelectionChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    rol: value as string,
                  }))
                }
                classNames={{
                  base: "font-bold",
                }}
              >
                {rol.map((option) => (
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

              {(() => {
                if (formData.rol === "1") {
                  return (
                    <div className="flex flex-col gap-4">
                      {/* Componentes para ciclista */}
                      <Autocomplete
                        label="Especialidad"
                        color="secondary"
                        variant="underlined"
                        size="md"
                        radius="md"
                        placeholder="Seleccione una Especialidad"
                        defaultItems={especialidad}
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
												label="Contextura"
												color="secondary"
												variant="underlined"
												size="md"
												radius="md"
												placeholder="Seleccione un Rol"
												defaultItems={contexturas}
												onSelectionChange={(value) =>
													setFormData((prev) => ({
														...prev,
														contextura:
															value as string,
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
															selectedIcon:
																"text-secondary",
														}}
													>
														{option.label}
													</AutocompleteItem>
												))}
											</Autocomplete>
										</div>
									);
								} else if (formData.rol === "2") {
									return (
										<Input
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
													nacionalidad:
														value as string,
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
														selectedIcon:
															"text-secondary",
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
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
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
