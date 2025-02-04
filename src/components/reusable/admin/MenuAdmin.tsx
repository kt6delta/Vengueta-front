"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, Image } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useRouter } from "next/navigation";
import { FaHouseChimney } from "react-icons/fa6";
import { Title } from "@/components/reusable/title";

export const MenuAdmin = () => {
  const route = useRouter();
  const [isVertical, setIsVertical] = useState(false);
  const [selected, setSelected] = useState('');
  function handleMenu(menu: any) {
    setSelected(menu);
    // route.push(`/${menu}`);
  }

  function exit(e: any) {
    e.preventDefault();
    localStorage.clear();
    route.push(`/login`);
  }
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="w-full gap-x-2 justify-center flex flex-row md:flex-col md:w-1/4 md:gap-x-5 md:mx-5 md:mt-10 md:justify-start">
        <div className="justify-center items-center hidden sm:flex px-7">
          <Image
            src="/Logo-2.png"
            alt="logo"
            width={100}
            height={100}
            className="rounded-none"
          /> <Title mesage="Vegeta Proyect" className="text-center"/>
        </div>
        <Tabs
          radius="lg"
          aria-label="Options"
          isVertical={isVertical}
          className="grid grid-flow-col pt-5 pb-5 md:pb-10 w-full md:border-b-1 md:border-black"
          variant="light"
          selectedKey={selected}
          onSelectionChange={handleMenu}
        >
          <Tab
            id="menu"
            className="h-[5vh] justify-start focus:shadow-card"
            key="unidades"
            title={
              <div className="flex items-center gap-2">
                <div id='icon'>
                  <FaHouseChimney className="font-black w-5 h-5 md:w-10 md:h-10" />
                </div>
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl">Unidades</p>
              </div>
            }
          ></Tab>
          <Tab
            id="menu"
            key="usuarios"
            className="h-[5vh] justify-start focus:shadow-card"
            title={
              <div className="flex items-center gap-2">
                <div id='icon'>
                  <Icon icon="fluent:people-team-16-filled" className="font-black w-5 h-5 md:w-10 md:h-10" />
                </div>
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl">Usuarios</p>
              </div>
            }
          ></Tab>
        </Tabs>
        <div className="flex items-center mt-5 mb-5">
          <Button
            color="primary"
            variant="light"
            className="w-full flex text-black justify-start items-center h-[5vh]"
            id="menu"
            onClick={exit}
          >
            <div className="flex items-center">
              <div id='icon'>
                <Icon icon="mdi:location-exit" className="font-black w-5 h-5 md:w-10 md:h-10" />
              </div>
              <p className="ml-2 text-sm sm:text-base md:text-xl lg:text-2xl">Cerrar Sesión</p>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};
