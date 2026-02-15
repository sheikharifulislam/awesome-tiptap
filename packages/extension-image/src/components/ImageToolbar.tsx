import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@awesome-tiptap/ui/components/select';
import { Separator } from '@awesome-tiptap/ui/components/separator';
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
  Captions,
  Lock,
} from '@awesome-tiptap/ui/icons';

const objectFitOptions = [
  {
    label: 'Fill',
    value: 'fill',
  },
  {
    label: 'Cover',
    value: 'cover',
  },
  {
    label: 'Contain',
    value: 'contain',
  },
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Scale Down',
    value: 'scale-down',
  },
];

export function ImageToolbar() {
  return (
    <div>
      <AlignStartVertical />
      <Separator />
      <AlignCenterVertical />
      <Separator />
      <AlignEndVertical />
      <Separator />
      <Captions />
      <Separator />
      <Lock />
      <Separator />
      <Select items={objectFitOptions}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Object Fit</SelectLabel>
            {objectFitOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
