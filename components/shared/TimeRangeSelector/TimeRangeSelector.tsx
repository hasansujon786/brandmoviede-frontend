import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type TimeRangeSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
};

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  value,
  onValueChange,
  label = "Select time range",
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
        aria-label={label}
      >
        <SelectValue placeholder="Last 3 months" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="90d" className="rounded-lg">
          Last 3 months
        </SelectItem>
        <SelectItem value="30d" className="rounded-lg">
          Last 30 days
        </SelectItem>
        <SelectItem value="7d" className="rounded-lg">
          Last 7 days
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeRangeSelector;
