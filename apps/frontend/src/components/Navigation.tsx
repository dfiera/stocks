import {
  createLink,
  Link,
  useLocation,
  useRouter
} from '@tanstack/react-router';
import {
  RiBankLine,
  RiLogoutBoxLine,
  RiSearchLine,
  RiStockLine,
  RiUser3Line
} from '@remixicon/react';
import { useAuth } from '../context/AuthContext.tsx';
import { useScroll } from '../hooks/useScroll.ts';
import { cx } from '../lib/utils.ts';
import { TabNavigation, TabNavigationLink } from './TabNavigation.tsx';
import SymbolSearch from './SymbolSearch.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './DropdownMenu.tsx';
import { Button } from './Button.tsx';

const AccountMenu = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button variant="light" className="group w-9 h-9 rounded-full p-0 focus-visible:outline-0">
          <RiUser3Line className="size-4 fill-gray-500 group-hover:dark:fill-gray-400" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            to="/"
            onClick={onLogout}
            className="w-full inline-flex items-center gap-x-2"
          >
            <RiLogoutBoxLine className="size-4 shrink-0 border-inherit" aria-hidden />
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const location = useLocation({
    select: (location) => location.pathname
  });
  const { isScrolled } = useScroll();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout.mutate(undefined, {
        onSuccess: () => {
          router.invalidate();
        }
      });
    }
  };

  const CustomLink = createLink(TabNavigationLink);

  return (
    <div className={cx(
      "sticky top-0 h-16 z-50 transition-all duration-300",
      isScrolled && "lg:pt-4"
    )}>
      <TabNavigation className={cx(
        "h-16 max-w-4/5 mx-auto px-8 justify-end gap-8 transition-all duration-300",
        isScrolled && "bg-gray-50/75 dark:bg-gray-900/75 shadow-2xl shadow-black/25 backdrop-blur-sm lg:border lg:rounded-xl"
      )}>
        <CustomLink
          to="/markets"
          active={location === '/markets'}
          className="inline-flex gap-2 px-0"
        >
          <RiBankLine className="size-4" aria-hidden />
          Markets
        </CustomLink>

        <CustomLink
          to="/screener"
          active={location === '/screener'}
          className="inline-flex gap-2 px-0"
        >
          <RiStockLine className="size-4" aria-hidden />
          Screener
        </CustomLink>

        <SymbolSearch
          trigger={
            <Button variant="secondary" className="bg-inherit dark:bg-inherit">
              <RiSearchLine className="size-4 shrink-0 fill-gray-500 group-hover:dark:fill-gray-400" aria-hidden />
              <span className="text-sm text-gray-500 group-hover:dark:text-gray-400">
                Search
              </span>
              <kbd className="hidden h-5 ml-2 items-center text-center gap-0.5 rounded border border-gray-500 group-hover:dark:border-gray-400 px-1.5 text-gray-500 group-hover:dark:text-gray-400 font-semibold sm:inline-flex">
                <kbd className="text-[13px]">⌘</kbd>
                <kbd className="text-[10px]">K</kbd>
              </kbd>
            </Button>
          }
        />
        <div className="h-8 lg:border-l border-inherit" />
        {!isAuthenticated ? (
          <CustomLink
            to="/login"
            className="px-0"
          >
            Log In
          </CustomLink>
        ) : (
          <AccountMenu onLogout={handleLogout} />
        )}
      </TabNavigation>
    </div>
  );
}
