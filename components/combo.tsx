"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ftype = {
  value: string;
  label: string;
}[];

interface proptype {
  heading: string;
  frameworks: ftype;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any; //FIXME
  data: string;
}

export function ComboboxDemo({
  heading,
  frameworks,
  value,
  setValue,
  data,
}: proptype) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit h-fit justify-between text-wrap"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : heading}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search " className="h-9" />
          <CommandList>
            <CommandEmpty>No Data Found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setValue((val: any) => ({
                      ...val,
                      [data]: currentValue,
                    }));
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
