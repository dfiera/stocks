import {
  createLink,
  Link,
  useLocation,
  useRouter
} from '@tanstack/react-router';
import {
  RiBankLine,
  RiLogoutBoxLine,
  RiStockLine,
  RiUser3Line
} from '@remixicon/react';
import { useAuth } from '../context/AuthContext.tsx';
import { TabNavigation, TabNavigationLink } from './TabNavigation.tsx';
import Search from './Search.tsx';
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
            className="inline-flex items-center gap-x-2"
          >
            <RiLogoutBoxLine className="size-4 border-inherit" aria-hidden />
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
    <TabNavigation className="h-16 justify-end gap-8 px-8 mb-8">
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

      <Search />
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
  );
}
