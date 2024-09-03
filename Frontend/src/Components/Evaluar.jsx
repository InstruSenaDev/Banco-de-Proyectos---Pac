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
  
        <Select defaultValue="0">
          <SelectItem value="1">Aprobado</SelectItem>
          <SelectItem value="2">No aceptado</SelectItem>
        </Select>
  
      </div>
    );
  }