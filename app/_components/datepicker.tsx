import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface BasicDatePickerProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      name: string;
      fatherName: string;
      motherName: string;
      Address: string;
      dob: dayjs.Dayjs;
      mobile: string;
      wapp: string;
      courseName: string;
    }>
  >;
}

export default function BasicDatePicker({
  selectedDate,
  setSelectedDate,
}: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={(newValue: dayjs.Dayjs | null) =>
            setSelectedDate((prev) => ({
              ...prev,
              dob: newValue ? newValue : prev.dob,
            }))
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
