import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useForm } from "@tanstack/react-form";
import { SearchIcon, X } from "lucide-react";
import z from "zod";
import { usePaginationPage } from "./PaginationPageProvider";

export const searchCoinSchema = z.object({
  search: z.string().min(2),
});
export type SearchCoinFormValues = z.infer<typeof searchCoinSchema>;

interface TableSearchInputProps {
  shouldResetOnBlur: boolean;
}

export default function TableSearchInput({
  shouldResetOnBlur = false,
}: TableSearchInputProps) {
  const { searchedId, clearSearch, setSearch } = usePaginationPage();

  // Search form
  const form = useForm({
    defaultValues: { search: "" },
    validators: { onSubmit: searchCoinSchema },
    onSubmit: async ({ value }) => {
      setSearch(value.search);
    },
  });
  const handleClearSearch = () => {
    form.reset();
    clearSearch();
  };

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
                    if (shouldResetOnBlur) handleClearSearch();
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
                      onClick={handleClearSearch}
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
