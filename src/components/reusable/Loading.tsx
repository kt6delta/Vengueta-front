"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { Header } from "@/components/reusable/user/Header";
import { CardWrapper } from "@/components/reusable/CardWrapper";
import { FooterPage } from "@/components/reusable/user/FooterPage";

interface LoadingProps {
    children?: React.ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Spinner label="Loading..." color="primary" classNames={{
                    base: 'w-52 h-52',
                    wrapper: 'w-52 h-52',
                    circle1: 'w-52 h-52',
                    circle2: 'w-52 h-52',
                    label: 'h-64 my-auto',
                }} />
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className='lg:w-full'>
                    <CardWrapper className='p-0'>
                        <Header/>
                        <div className="bg-white p-10">
                        {children}
                        </div>
                        <FooterPage />
                    </CardWrapper>
                </div>
            </div>
        );
    }
};