import { useState } from 'react';
import type { Table } from '@tanstack/react-table';

interface FilterOptionProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const FilterOption = ({ label, onClick, isActive }: FilterOptionProps) => {
  return (
    <button
      key={label}
      className={`py-2 px-1 transition-colors border-b-2 text-sm ${
        isActive ? 'border-black font-semibold' : 'border-transparent hover:border-gray-300'
      }`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

interface DataTableFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (value: string) => () => {
    setFilter(value);

    if (value === 'all') {
      table.resetColumnFilters();
      return;
    }

    table.getColumn('status')?.setFilterValue(value);
  };

  return (
    <div className="flex gap-4">
      <FilterOption label="전체(000)" onClick={handleFilterChange('all')} isActive={filter === 'all'} />
      <FilterOption
        label="승인대기중(000)"
        onClick={handleFilterChange('suspended')}
        isActive={filter === 'suspended'}
      />
    </div>
  );
}
