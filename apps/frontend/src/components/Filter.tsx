import { useState } from 'react';
import { RiFilter3Line } from '@remixicon/react';
import { Popover, PopoverContent, PopoverTrigger } from './Popover.tsx';
import { Button } from './Button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './Select.tsx';
import { Label } from './Label.tsx';
import { Divider } from './Divider.tsx';
import { Input } from './Input.tsx';
import type { Filter } from '../types.ts';
import type { FilterAttribute, FilterCondition } from './Screener.tsx';

interface FilterProps {
  attributes: FilterAttribute[];
  conditions: FilterCondition[];
  onApply: (filters: Filter[]) => void;
}

let id = 1;
const MAX_NUM_FILTERS = 8;

export default function Filter({
  attributes,
  conditions,
  onApply
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([
    { id: id++, attribute: attributes[0].value, condition: '', value: '' }
  ]);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  const getAttributeType = (attribute: string) => {
    return attributes.find((a) => a.value === attribute)?.type || 'string';
  };

  const getValidConditions = (attribute: string): FilterCondition[] => {
    const type = getAttributeType(attribute);

    return conditions.filter((condition) => condition.supportedTypes.includes(type));
  };

  const handleAddFilter = () => {
    const newFilter: Filter = {
      id: id++,
      attribute: attributes[0].value,
      condition: '',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const handleClear = () => {
    const defaultFilter = {
      id: 1,
      attribute: attributes[0].value,
      condition: '',
      value: ''
    };
    setAppliedFiltersCount(0);
    setFilters([defaultFilter]);
    onApply([]);
  };

  const handleAttributeChange = (filterId: number, newAttribute: string) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === filterId) {
        return {
          ...filter,
          attribute: newAttribute,
          condition: '',
          value: ''
        };
      }
      return filter;
    });
    setFilters(updatedFilters);
  };

  const handleApply = () => {
    const activeFilters = filters.filter((f) => f.value.trim() !== '');

    setAppliedFiltersCount(activeFilters.length);
    onApply(activeFilters);
    setIsOpen(false);
  };

  return (
    <Popover
      modal
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger asChild>
        <Button variant="secondary" className="gap-1.5 w-full sm:w-auto">
          <RiFilter3Line className="size-5" aria-hidden />
          Filter stocks{' '}
          {appliedFiltersCount > 0 && (
            <span className="bg-blue-500 px-1 rounded-sm tabular-nums">
              {appliedFiltersCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        {filters.map((filter) => (
          <div key={filter.id} className="flex gap-4 items-end p-4">
            <div className="flex flex-col">
              <Label htmlFor={`attribute-${filter.id}`}>Where</Label>
              <Select
                value={filter.attribute}
                onValueChange={(value) => handleAttributeChange(filter.id, value)}
              >
                <SelectTrigger id={`attribute-${filter.id}`} className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {attributes.map((attribute) => (
                    <SelectItem key={attribute.value} value={attribute.value}>
                      {attribute.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <Label htmlFor={`condition-${filter.id}`}>Condition</Label>
              <Select
                value={filter.condition}
                onValueChange={(value) => {
                  setFilters(
                    filters.map((f) => {
                      return f.id === filter.id
                        ? { ...f, condition: value }
                        : f
                    })
                  );
                }}
              >
                <SelectTrigger id={`condition-${filter.id}`} className="mt-2">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => {
                    const validConditions = getValidConditions(filter.attribute);

                    return (
                      <SelectItem
                        key={condition.value}
                        value={condition.value}
                        disabled={!validConditions.includes(condition)}
                      >
                        {condition.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="hidden">Value</Label>
              <Input
                className="mx-auto max-w-xs"
                type={getAttributeType(filter.attribute) === 'number' ? 'number' : 'text'}
                placeholder="Enter value"
                value={filter.value}
                onChange={(e) => {
                  setFilters(
                    filters.map((f) => {
                      return f.id === filter.id
                        ? { ...f, value: e.target.value }
                        : f
                    })
                  );
                }}
              />
            </div>
          </div>
        ))}
        <Divider className="my-0"/>
        <div className="flex justify-between items-center w-full p-4">
          <Button
            variant="light"
            onClick={handleAddFilter}
            disabled={!(filters.length < MAX_NUM_FILTERS)}
          >
            Add Filter
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
