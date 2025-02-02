"use client";
import React from "react";
import { TableList } from "@/components/reusable/table/TableList";
import { CardWrapper } from "@/components/reusable/CardWrapper";

export default function InfoEquipos() {

    return (
        <>
        <CardWrapper className="bg-white p-10">
            <TableList />
            </CardWrapper>
        </>
    )
}