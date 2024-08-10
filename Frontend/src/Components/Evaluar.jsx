import {
    Select,
    SelectItem,
  } from '@tremor/react';
  
  export function Evaluar() {
    return (
      <div className="mx-auto max-w-xs">
        <div className="mb-4 text-center font-mono text-sm text-slate-500">
          Select
        </div>
        <Select defaultValue="1">
          <SelectItem value="1">Option One</SelectItem>
          <SelectItem value="2">Option Two</SelectItem>
          <SelectItem value="3">Option Three</SelectItem>
        </Select>

      </div>
    );
  }