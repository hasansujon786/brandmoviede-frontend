import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, X } from "lucide-react";
import { usePaginationPage } from "./PaginationPageProvider";

interface TableSearchInputProps {
  shouldResetOnBlur: boolean;
}

export default function TableSearchInput({
  shouldResetOnBlur = false,
}: TableSearchInputProps) {
  const { searchedId, clearSearch, form } = usePaginationPage();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="search">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <InputGroup className="bg-card h-11 w-60 rounded-2xl border-[#FFEBF8]">
                <InputGroupInput
                  placeholder="Search..."
                  className="placeholder:text-[#D2D2D5]"
                  id={field.name}
                  value={field?.state?.value as string}
                  onBlur={() => {
                    if (shouldResetOnBlur) clearSearch();
                    field.handleBlur();
                  }}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <InputGroupAddon>
                  <SearchIcon className="text-[#A5A5AB]" />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end">
                  {searchedId ? (
                    <Button
                      onClick={clearSearch}
                      type="button"
                      className="rounded-full"
                      variant="ghost"
                      size="icon-md"
                    >
                      <X className="size-5 text-[#A5A5AB]" />
                    </Button>
                  ) : null}
                </InputGroupAddon>
              </InputGroup>

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </form>
  );
}
