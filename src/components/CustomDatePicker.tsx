// CustomDatePicker.tsx
import React, { useEffect, useState } from "react";
import Picker from "react-mobile-picker";

type PickerValue = {
  year: number | string;
  month: number | string;
  day: number | string;
};

interface Props {
  value: PickerValue;
  onChange: (nextValue: PickerValue) => void;
}

const currentYear = new Date().getFullYear();
const startYear = currentYear - 30;
const endYear = currentYear + 10;

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getMaxDays = (year: number, month: number) => {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

const CustomDatePicker: React.FC<Props> = ({ value, onChange }) => {
  const [dayOptions, setDayOptions] = useState<number[]>([]);

  useEffect(() => {
    const yearNum = Number(value.year);
    const monthNum = Number(value.month);
    const maxDays = getMaxDays(yearNum, monthNum);
    setDayOptions(Array.from({ length: maxDays }, (_, i) => i + 1));

    if (Number(value.day) > maxDays) {
      onChange({ ...value, day: maxDays });
    }
  }, [value.year, value.month]);

  const selections = {
    year: Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i,
    ),
    month: Array.from({ length: 12 }, (_, i) => i + 1),
    day: dayOptions,
  };

  return (
    <div style={{ width: "500px", height: "250px" }}>
      <Picker
        value={value}
        onChange={onChange}
        wheelMode="normal"
        itemHeight={80}
      >
        {(Object.keys(selections) as Array<keyof typeof selections>).map(
          (key) => (
            <Picker.Column key={key} name={key}>
              {selections[key].map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div
                      style={{
                        color: selected ? "#364B76" : "gray",
                        fontWeight: selected ? 650 : "normal",
                        fontSize: "36px",
                        borderRadius: "5px",
                        padding: "12px 20px",
                      }}
                    >
                      {option}
                      {key === "year" && " 년"}
                      {key === "month" && " 월"}
                      {key === "day" && " 일"}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          ),
        )}
      </Picker>
    </div>
  );
};

export default CustomDatePicker;
