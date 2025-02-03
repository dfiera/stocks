import {
  RiAddLargeFill,
  RiMore2Fill,
  RiPencilFill
} from '@remixicon/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../DropdownMenu.tsx';
import { Button } from '../Button.tsx';

export default function WatchlistActions() {
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group">
          <RiMore2Fill className="size-5 shrink-0 fill-gray-500 group-hover:dark:fill-gray-400" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52">
        <DropdownMenuLabel>Watchlist</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a
            className="inline-flex items-center gap-x-2"
          >
            <RiAddLargeFill className="size-4 shrink-0 border-inherit" aria-hidden />
            Add Symbol
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            className="inline-flex items-center gap-x-2"
          >
            <RiPencilFill className="size-4 shrink-0 border-inherit" aria-hidden />
            Update Watchlist
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
