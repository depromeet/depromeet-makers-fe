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

interface AttendanceTableFilterProps<T> {
  table: Table<T>;
  filterColumn?: string;
}

const TEAM_OPTION = [
  { id: 'all', label: '전체' },
  { id: '1', label: '1팀' },
  { id: '2', label: '2팀' },
  { id: '3', label: '3팀' },
  { id: '4', label: '4팀' },
  { id: '5', label: '5팀' },
  { id: '6', label: '6팀' },
];

export const AttendanceTableFilter = <T,>({ table, filterColumn = 'groupId' }: AttendanceTableFilterProps<T>) => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (value: string) => () => {
    setFilter(value);

    if (value === 'all') {
      table.resetColumnFilters();
      return;
    }

    table.getColumn(filterColumn)?.setFilterValue(value);
  };

  return (
    <div className="flex gap-4">
      {TEAM_OPTION.map((team) => (
        <FilterOption
          key={team.id}
          label={team.label}
          onClick={handleFilterChange(team.id)}
          isActive={filter === team.id}
        />
      ))}
    </div>
  );
};
