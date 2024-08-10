import {
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from '@tremor/react';

export function Evaluar() {
  return (
    <div className="mx-auto max-w-xs">

      <Select defaultValue="1">
        <SelectItem value="1">Bueno</SelectItem>
        <SelectItem value="2">No aceptado</SelectItem>
      </Select>

    </div>
  );
}