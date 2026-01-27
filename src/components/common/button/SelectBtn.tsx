import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOption = {
  label: string;
  value: string;
};

type CommonSelectProps = {
  value: string;
  onChange?: (value: string) => void; // API 연동 후 옵셔널 제거
  placeholder: string;
  options: SelectOption[];
  className?: string;
};

export default function SelectBtn({
  value,
  onChange,
  placeholder,
  options,
  className,
}: CommonSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`${className ?? ""} gap-2 cursor-pointer`.trim()}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            className="cursor-pointer"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
