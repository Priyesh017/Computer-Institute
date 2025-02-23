import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({
  selectedDate,
  setSelectedDate,
}: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Choose DOB"
          value={selectedDate}
          onChange={(newValue: any) =>
            setSelectedDate((prev: any) => ({ ...prev, dob: newValue }))
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
