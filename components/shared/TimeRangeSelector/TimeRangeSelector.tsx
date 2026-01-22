import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISalesAnalyticsChartParams } from "@/types/admin/dashboard";
import React from "react";

type TimeRangeSelectorProps = {
  value: ISalesAnalyticsChartParams;
  onValueChange: (value: ISalesAnalyticsChartParams) => void;
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
        <SelectItem value="lastYear" className="rounded-lg">
          Last Year
        </SelectItem>
        <SelectItem value="lastThreeMonth" className="rounded-lg">
          Last Three Month
        </SelectItem>
        <SelectItem value="lastMonth" className="rounded-lg">
          Last 30 days
        </SelectItem>
        <SelectItem value="lastSevenDay" className="rounded-lg">
          Last 7 days
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeRangeSelector;
