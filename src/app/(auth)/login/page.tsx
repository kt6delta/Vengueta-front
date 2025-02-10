"use client";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { EyeFilledIcon } from "@/components/reusable/register/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/reusable/register/EyeSlashFilledIcon";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Login() {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);
	const [formData, setFormData] = useState({ //almacenar datos del form
		email: "",
		password: "",
	});

	const toggleVisibility = () => setIsVisible(!isVisible); //visibilidad de contraseña

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {//envío del form
		e.preventDefault();
		try {
			const { email, password } = formData;
			const payload = {
				username: email, 
				password,
			};

			const user=await axios.post(`${process.env.NEXT_PUBLIC_API_URL_BACKEND}/signin`, payload);

			toast.success("Login exitoso");
			router.push("/reserva");
			localStorage.setItem("user_id", user.data.id);
			localStorage.setItem("auth_token", user.data.token);
		} catch (error) {
			toast.error("Oops! Algo salió mal!");
			console.error(error);
		}
	};

	return (
		<form className="w-full grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
			<div className="hidden justify-center items-center md:flex">
				<Image
					className="object-cover rounded-default"
					width={700}
					height={700}
					src="/casa3.png"
					alt="logo"
					loading="lazy"
				/>
			</div>
			<div className="flex w-full flex-col gap-4 p-10 my-auto">
				<h1 className="text-center text-secondary text-3xl font-semibold">Inicia Sesión</h1>
				<div className="flex flex-col gap-4 p-5">
					<Input
						isRequired
						type="email"
						variant="underlined"
						label="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="tucorreo@ejemplo.com"
						classNames={{ base: "font-bold" }}
					/>
					<Input
						isRequired
						variant="underlined"
						label="Password"
						placeholder="******"
						name="password"
						value={formData.password}
						onChange={handleChange}
						classNames={{ base: "font-bold" }}
						endContent={
							<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
								{isVisible ? (
									<EyeSlashFilledIcon className="text-2xl text-default-400" />
								) : (
									<EyeFilledIcon className="text-2xl text-default-400" />
								)}
							</button>
						}
						type={isVisible ? "text" : "password"}
					/>
					<div className="flex flex-col items-center mt-4">
						<Button color="primary" radius="full" variant="ghost" type="submit" className="w-44 mb-2">
							Ingresar
						</Button>
						<p className="text-sm">
							¿No tienes cuenta?{" "}
							<Link href="/registro" className="text-primary underline font-bold">
								Regístrate
							</Link>
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
