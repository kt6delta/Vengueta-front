import { Navbar, NavbarContent, Image } from "@nextui-org/react";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter();
    return (
        <Navbar className="bg-primary  p-0 rounded-2xl w-full min-h-20 justify-start ">
            <NavbarContent as="div" justify="start" className="p-0">
                <div className="ml-0 p-0">
                    <Dropdown className="ml-16 w-4">
                        <DropdownTrigger>
                            <Button className="bg-primary h-16 w-16">
                                <Image
                                    src="/menu.png"  // Ruta a tu imagen
                                    alt="Menu Icon"
                                    width={64}  // Ajusta el ancho de la imagen
                                    height={64}  // Ajusta la altura de la imagen
                                    className="rounded-none object-cover invert"  // Clases de Tailwind CSS para redondear y ajustar la imagen
                                />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" >
                            <DropdownItem key="new" href="/director/creacionEquipo" >Creacion de Equipo</DropdownItem>
                            <DropdownItem key="edit" href="/login">Perfil</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </NavbarContent>
        </Navbar>
    );
}