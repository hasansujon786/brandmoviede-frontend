import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

export default function TopActionBar({ children }: PropsWithChildren) {
  return (
    <section className="flex justify-between">
      <InputGroup className="bg-card h-12 w-60 rounded-2xl border-[#FFEBF8]">
        <InputGroupInput
          placeholder="Search..."
          className="placeholder:text-[#D2D2D5]"
        />
        <InputGroupAddon>
          <SearchIcon className="text-[#A5A5AB]" />
        </InputGroupAddon>
      </InputGroup>

      {children}
    </section>
  );
}
