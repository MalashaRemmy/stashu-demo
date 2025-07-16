
// src/components/ui/DatePicker.tsx
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Styles must be imported separately
interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  label?: string;
}

export default function DatePicker({
  selected,
  onChange,
  minDate,
  maxDate,
  placeholderText = 'Select date',
  label,
}: DatePickerProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholderText}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}