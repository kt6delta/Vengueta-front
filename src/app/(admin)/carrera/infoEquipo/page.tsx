"use client";
import React from "react";
import InformacionEquipo from "@/components/reusable/informacionEquipo";
import { CardWrapper } from "@/components/reusable/CardWrapper";

export default function InfoEquipo() {

    return (
        <>
            <CardWrapper className="bg-white p-10">
                <InformacionEquipo />
            </CardWrapper>
        </>
    )
}