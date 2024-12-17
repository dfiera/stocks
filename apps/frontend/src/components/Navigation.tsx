import { createLink, useLocation, useRouter } from '@tanstack/react-router';
import { RiFundsLine, RiStockLine, RiUserLine } from '@remixicon/react'
import { useAuth } from '../context/AuthContext.tsx';
import { TabNavigation, TabNavigationLink } from './TabNavigation.tsx';

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
    <TabNavigation className="flex justify-end px-6 mt-4 mb-8">
      <div className="lg:flex items-start gap-8">
        <CustomLink
          to="/markets"
          active={location === '/markets'}
          className="inline-flex gap-2 px-0"
        >
          <RiFundsLine className="size-4" aria-hidden="true" />
          Markets
        </CustomLink>
        <CustomLink
          to="/screener"
          active={location === '/screener'}
          className="inline-flex gap-2 px-0"
        >
          <RiStockLine className="size-4" aria-hidden="true" />
          Screener
        </CustomLink>
        <CustomLink
          to="/profile"
          active={location === '/profile'}
          className="inline-flex gap-2 px-0"
        >
          <RiUserLine className="size-4" aria-hidden="true" />
          Profile
        </CustomLink>
        <div className="lg:border-l border-gray-800 h-5" />
      </div>
      <div className="lg:ml-8">
        {
          !isAuthenticated ? (
            <CustomLink
              to="/login"
              className="px-0"
            >
              Log in
            </CustomLink>
          ) : (
            <CustomLink
              to="/"
              onClick={handleLogout}
              className="px-0"
            >
              Log out
            </CustomLink>
          )
        }
      </div>
    </TabNavigation>
  );
}
