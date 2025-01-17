import React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import type { DialogProps } from '@radix-ui/react-dialog';
import { RiSearchLine } from '@remixicon/react';
import { cx } from '../lib/utils.ts';
import { DialogContent } from './Dialog.tsx';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cx(
      "flex h-full w-full flex-col overflow-hidden rounded-md",
      className
    )}
    {...props}
  />
));

Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <CommandPrimitive.Dialog {...props} label="Global Symbol Search">
      <DialogContent className="overflow-hidden p-0 text-gray-500 dark:bg-gray-950">
        <Command
          loop
          className="[&_[cmdk-input-wrapper]_svg]:w-5"
        >
          {children}
        </Command>
      </DialogContent>
    </CommandPrimitive.Dialog>
  );
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b dark:border-gray-900 px-3" cmdk-input-wrapper="">
    <RiSearchLine className="h-4 w-4 shrink-0 fill-gray-500" />
    <CommandPrimitive.Input
      ref={ref}
      className={cx(
        "flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-white border-none focus:ring-0 dark:placeholder-gray-500",
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cx(
      "max-h-[35rem] overflow-y-auto overflow-x-hidden",
      className
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-sm text-center"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cx(
      "overflow-hidden p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cx(
      "-mx-1 h-px dark:bg-gray-900",
      className
    )}
    {...props}
  />
));

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cx(
      "relative flex px-2 py-3 rounded-md aria-selected:bg-gray-900/60 aria-selected:text-gray-500 data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
};
