import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Select<T extends object>({
  data,
  keyName,
  valueName,
  defaultValue,
  onSelect,
}: {
  data: T[];
  keyName: keyof T;
  valueName: keyof T;
  defaultValue: number | string;
  onSelect: (id: number | string) => void;
}) {
  return (
    <SelectUI
      onValueChange={(value) => onSelect(value)}
      defaultValue={defaultValue?.toString()}
    >
      <SelectTrigger className="w-full border-none rounded-md bg-white">
        <SelectValue placeholder="Select User" />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={String(item[keyName])} value={String(item[keyName])}>
            {String(item[valueName])}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectUI>
  );
}
