import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusSelectProps = {
  value: "Active" | "Inactive";
  isLoading?: boolean;
  onChange: (value: "Active" | "Inactive") => void;
};

export function StatusSelect({
  value,
  isLoading = false,
  onChange,
}: StatusSelectProps) {
  const is_active = value === "Active";

  return (
    <Select disabled={isLoading} value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={value}
        className={cn("w-28 border-transparent bg-current/10", {
          "text-[#007BFF]": is_active,
          "text-[#CF5C56]": !is_active,
        })}
      >
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Active" className="rounded-lg">
          Active
        </SelectItem>
        <SelectItem value="Inactive" className="rounded-lg">
          Inactive
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
