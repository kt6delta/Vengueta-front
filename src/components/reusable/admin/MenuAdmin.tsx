"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { IoMdBicycle } from "react-icons/io";
import { Icon } from '@iconify/react';
import { useRouter } from "next/navigation";

export const MenuAdmin = () => {
  const route= useRouter();
  const [isVertical, setIsVertical] = useState(false);
  const [selected, setSelected] = useState('');
  function handleMenu(menu: any) {
    setSelected(menu);
    route.push(`/${menu}`);
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
        <div className="justify-center items-center hidden sm:flex">
          <IoMdBicycle className="w-10 h-10 md:w-20 md:h-20 lg:w-28 lg:h-28 text-[#001731]" />
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
            key="carrera"
            title={
              <div className="flex items-center gap-2">
                <div id='icon'>
                  <Icon icon="vaadin:stopwatch" className="font-black w-5 h-5 md:w-10 md:h-10" />
                </div>
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl">Carrera</p>
              </div>
            }
          ></Tab>
          <Tab
          id="menu"
            key="carrera/infoEquipos"
            className="h-[5vh] justify-start focus:shadow-card"
            title={
              <div className="flex items-center gap-2">
                <div id='icon'>
                  <Icon icon="fluent:people-team-16-filled" className="font-black w-5 h-5 md:w-10 md:h-10" />
                </div>
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl">Equipos</p>
              </div>
            }
          ></Tab>
          <Tab
          id="menu"
            key="dashBoard"
            className="h-[5vh] justify-start focus:shadow-card"
            title={
              <div className="flex items-center gap-2">
                <div id='icon'>
                  <Icon icon="healthicons:high-bars" className="font-black w-5 h-5 md:w-10 md:h-10" />
                </div>
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl">Estadisticas</p>
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
