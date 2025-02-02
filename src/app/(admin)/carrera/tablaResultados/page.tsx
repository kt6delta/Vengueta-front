import React from "react";
import { TableList } from "@/components/reusable/table/TableList";
import { CardWrapper } from "@/components/reusable/CardWrapper";

const TablaResultados = () => {
  return (
    <>
      <CardWrapper className="p-10 bg-white">
        <TableList />
      </CardWrapper>
    </>
  );
};

export default TablaResultados;
