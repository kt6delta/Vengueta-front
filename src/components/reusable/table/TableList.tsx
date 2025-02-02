'use client';
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  SortDescriptor,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/reusable/table/SearchIcon";
import { ChevronDownIcon } from "@/components/reusable/table/ChevronDownIcon";
import { columns, users } from "@/utils/constantes/data";
import { capitalize } from "@/utils/utils";
import { Title } from "@/components/reusable/title";

const INITIAL_VISIBLE_COLUMNS = ["pais", "equipo", "tiempo"];

interface flagMap {
  [key: string]: string;
}

export const TableList = () => {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "tiempo",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [flagMap, setFlagMap] = useState({}as flagMap);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch countries data
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        const map: { [key: string]: any } = {};
        response.data.forEach((country: { name: { common: string; }; flags: { png: any; }; }) => {
          map[country.name.common.toLowerCase()] = country.flags.png;
        });
        setFlagMap(map);
        setCountries(response.data);
        setDataLoaded(true); // Set data loaded to true after fetching data
        console.log("Countries data loaded", response.data); // Debugging line
      })
      .catch(error => {
        console.error("Error fetching countries data:", error);
        setDataLoaded(true); // Ensure dataLoaded is true even if there's an error to avoid infinite loading
      });
  }, [users, filterValue]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns.has("all")) return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.equipo.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
  
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: { [x: string]: any; pais: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; }, columnKey: string | number) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "pais":
        return (
          <div className="flex items-center">
            {
              //flagMap['Colombia']
            flagMap[(user.pais as string).toLowerCase()] && (
              <img src={flagMap[(user.pais as string).toLowerCase()]} alt={`${user.pais} flag`} width={24} height={16} />
            )
            }
            <span className="text-small md:text-base lg:text-xl ml-2">{user.pais}</span>
          </div>
        );
      case "equipo":
        return (
          <div className="flex flex-col">
            <p className="text-small md:text-base lg:text-xl capitalize">{cellValue}</p>
          </div>
        );
      case "tiempo":
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-small md:text-base lg:text-xl text-bold capitalize">{cellValue}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, [flagMap]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: { target: { value: any; }; }) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: React.SetStateAction<string>) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por Equipo..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small md:text-base lg:text-xl" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                // onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex flex-col">
        <Title className="ml-8 capitalize" mesage="RESULTADOS DE CARRERA" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small md:text-base lg:text-xl ml-6">Total {users.length} equipos</span>
          <label className="flex items-center text-default-400 text-small md:text-base lg:text-xl mr-12">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small md:text-base lg:text-xl ml-2"
              onChange={onRowsPerPageChange}
            >
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, users.length, onSearchChange, hasSearchFilter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  if (!dataLoaded) {
    return <div>Loading...</div>; // Show a loading indicator until data is loaded
  }

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Equipo no encontrado"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
