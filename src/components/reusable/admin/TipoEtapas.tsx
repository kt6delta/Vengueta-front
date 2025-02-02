import { Input } from "@nextui-org/react";
import { etapas } from "@/utils/constantes/data";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
interface TitleProps {
    className?: string;
    mesage: string;
}

export const TipoEtapas = ({ mesage }: TitleProps) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-16">
            <Autocomplete
                    label="Tipo"
                    color="secondary"
                    variant="underlined"
                    size="md"
                    radius="md"
                    defaultItems={etapas}
                    classNames={{
                        base: "font-bold",
                    }}
                >
                    {etapas.map((option: any) => (
                        <AutocompleteItem
                            key={option.value}
                            value={option.value}
                            classNames={{
                                selectedIcon:
                                    "text-secondary",
                            }}
                        >
                            {option.label}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Input
                    type="number"
                    variant="underlined"
                    label="Etapa"
                    name="etapa"
                    // value={formData.nombre}
                    // onChange={handleChange}
                    classNames={{
                        base: "font-bold",
                    }}
                />
            </div>
        </>
    )
}