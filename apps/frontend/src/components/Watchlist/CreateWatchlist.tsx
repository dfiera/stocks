import React, { useState } from 'react';
import { RiAddLargeFill } from '@remixicon/react';
import { useCreateWatchlist } from '../../api/mutations.ts';
import { cx } from '../../lib/utils.ts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../Dialog.tsx';
import { Button } from '../Button.tsx';
import { Label } from '../Label.tsx';
import { Input } from '../Input.tsx';
import { Divider } from '../Divider.tsx';

export default function CreateWatchlist({ onCreate }: { onCreate: ReturnType<typeof useCreateWatchlist> }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const data = new FormData(e.currentTarget);

      const nameFieldValue = data.get('name');
      const descriptionFieldValue = data.get('description');

      if (!nameFieldValue) return;

      const name = nameFieldValue.toString();
      const description = descriptionFieldValue?.toString() ?? '';

      onCreate.mutate({ name, description}, {
        onSuccess: () => {
          setOpen(false);
        }
      });
    } catch (e) {
      setError('Could not create watchlist. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cx(
            // base
            "h-full w-full items-center justify-start gap-1.5 font-semibold sm:text-sm",
            // text colour
            "text-gray-900 dark:text-gray-50",
            // focus
            "focus-visible:bg-gray-100 focus-visible:dark:bg-gray-900",
            // hover
            "hover:bg-gray-100 hover:dark:bg-gray-900"
          )}
          variant="ghost"
        >
          <RiAddLargeFill className="size-4 shrink-0" aria-hidden />
          New Watchlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create new watchlist</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6">
            Enter a name and an optional description for this watchlist.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} action="#" method="post" className="flex flex-col gap-y-4 mt-8">
          <div>
            <Label htmlFor="name" className="font-medium">
              Name
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="My Symbols"
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="description" className="font-medium">
              Description
            </Label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Most active stocks"
              className="mt-2"
            />
          </div>
          <Divider className="my-6" />
          <DialogFooter>
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="ghost"
              className="w-full sm:w-fit"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-fit"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
