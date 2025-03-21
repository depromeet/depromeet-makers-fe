import type { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DateTimePickerProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, FieldPath<T>>;
  onChangeTime: (type: 'hour' | 'minute', value: string) => void;
  onSelectDate: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, hour) => hour).reverse();
const MINUTES = Array.from({ length: 12 }, (_, minute) => minute * 5);

export const DateTimePicker = <T extends FieldValues = FieldValues>({
  field,
  onChangeTime,
  onSelectDate,
}: DateTimePickerProps<T>) => {
  const selectedHour = field.value ? field.value.getHours() : null;
  const selectedMinute = field.value ? field.value.getMinutes() : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
          >
            {field.value ? format(field.value, 'yyyy-MM-dd HH:mm') : <span>YYYY-MM-DD HH:mm</span>}

            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="sm:flex">
          <Calendar initialFocus mode="single" selected={field.value} onSelect={onSelectDate} />

          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <TimePicker
              values={HOURS}
              selectedValue={selectedHour}
              onChange={(value) => onChangeTime('hour', value.toString())}
              formatValue={(value) => value.toString()}
            />

            <TimePicker
              values={MINUTES}
              selectedValue={selectedMinute}
              onChange={(value) => onChangeTime('minute', value.toString())}
              formatValue={(value) => value.toString().padStart(2, '0')}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface TimePickerProps {
  values: number[];
  selectedValue: number | null;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
}

const TimePicker = ({ values, selectedValue, onChange, formatValue }: TimePickerProps) => (
  <ScrollArea className="w-64 sm:w-auto">
    <div className="flex sm:flex-col p-2">
      {values.map((value) => (
        <Button
          key={value}
          size="icon"
          variant={selectedValue === value ? 'default' : 'ghost'}
          className="sm:w-full shrink-0 aspect-square"
          onClick={() => onChange(value)}
        >
          {formatValue(value)}
        </Button>
      ))}
    </div>
    <ScrollBar orientation="horizontal" className="sm:hidden" />
  </ScrollArea>
);
