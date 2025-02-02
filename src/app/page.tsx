"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FooterPage } from '@/components/reusable/user/FooterPage';
import { Header } from '@/components/reusable/user/Header';
import { TableList } from '@/components/reusable/table/TableList';
import { CardUser } from '@/components/reusable/user/cardUser';
import { Navbar, NavbarContent, NavbarBrand, NavbarItem } from "@nextui-org/react";
import Image from 'next/image';
import { Spacer } from '@nextui-org/react';
import { cards } from '../components/reusable/carruselCard/data';
import { etapas } from '../components/reusable/carruselCard/dataEtapas';
import { Card } from '../components/reusable/carruselCard/Card';
import { Link } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { CardEtapas } from '@/components/reusable/carruselCard/CardEtapa';
import '../index.css';


export default function HomePage() {
  const router = useRouter();
  const carouselCards = [...cards, ...cards]
  const carouselEtapas = [...etapas, ...etapas]


  return (
    <div className="min-h-screen flex flex-col  justify-center bg-gradient-to-r from-gray-50 to-blue-600">
      <Navbar className='min-h-20'>
        <NavbarContent>

          <div className="ml-4 p-2 justify-start  rounded-2xl">
            <Image
              alt="Card background"
              className="object-cover ml-8"
              src={'/logo-remove.png'}
              width={150}
              height={100}
            />
          </div>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="primary" onClick={() => router.push('/login')} variant="flat" className='text-black'>
              Ingresar
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" onClick={() => router.push('/registro')} variant="flat" className='text-black'>
              Registrarse
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>






      <main className="flex-grow">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-10">
          <div className="md:w-1/2 flex flex-col items-end px-4">
            <h1 className="text-4xl font-bold mb-4 ">Bienvenido a nuestra plataforma</h1>
            <p className="text-xl mb-8">Aqui podras gestionar tus equipos de forma eficiente.</p>
            <button
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-500"
              onClick={() => router.push('/registro')}
            >
              Registrate
            </button>
          </div>
          <div className="md:w-1/2 flex justify-end md:mt-0 blur-sm">
            <Image
              alt="Welcome Image"
              src={'/landing-page3.jpeg'}
              width={850}
              height={500}
              className="object-cover rounded-lg"
            />
          </div>
        </div>


        {/* Features Section */}
        <div className="py-20 w-full">
          <h2 className="text-3xl font-bold text-center mb-10">Ciclistas</h2>
          <div className="w-full items-center">
            <div className="overflow-hidden w-full flex">
              <div className="flex whitespace-nowrap w-full animate-scroll">
                {carouselCards.map((card, index) => (
                  <Card card={card} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className=" w-full">
          <h2 className="text-3xl font-bold text-center mb-10">Etapas</h2>
          <div className="w-full items-center">
            <div className="overflow-hidden w-full flex">
              <div className="flex whitespace-nowrap w-full animate-scroll">
                {carouselEtapas.map((etapa, index) => (
                  <CardEtapas etapa={etapa} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>


      </main>

      <div className=" p-0 rounded-2xl w-full min-h-20 mt-auto">
        {/* Contenido del Footer aquí */}
      </div>
    </div>
  );
}
