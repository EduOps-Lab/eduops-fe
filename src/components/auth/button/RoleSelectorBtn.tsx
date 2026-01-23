"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { Role, RoleOption } from "@/types/auth.type";

type RoleSelectorBtnProps<T extends Role> = {
  options: RoleOption<T>[];
  value: T;
  onChange: (role: T) => void;
};

export default function RoleSelectorBtn<T extends Role>({
  options,
  value,
  onChange,
}: RoleSelectorBtnProps<T>) {
  return (
    <ButtonGroup aria-label="역할 선택" className="w-full flex justify-center">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <Button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isSelected}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
