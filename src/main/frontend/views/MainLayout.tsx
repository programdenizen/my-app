import { AppLayout } from '@vaadin/react-components/AppLayout.js';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Button } from '@vaadin/react-components/Button.js';
import { DrawerToggle } from '@vaadin/react-components/DrawerToggle.js';
import { useAuth } from 'Frontend/util/auth.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import { Suspense, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  const { state, logout } = useAuth();
  const profilePictureUrl =
    state.user &&
    `data:image;base64,${btoa(
      state.user.profilePicture.reduce((str, n) => str + String.fromCharCode((n + 256) % 256), ''),
    )}`;
  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">My App</h1>
          <nav>
            <NavLink className={navLinkClasses} to="/">
              Welcome
            </NavLink>
            {state.user ? (
              <NavLink className={navLinkClasses} to="/info">
                Info
              </NavLink>
            ) : null}
          </nav>
        </header>
        <footer className="flex flex-col gap-s">
          {state.user ? (
            <>
              <div className="flex items-center gap-s">
                <Avatar theme="xsmall" img={profilePictureUrl} name={state.user.name} />
                {state.user.name}
              </div>
              <Button onClick={async () => logout()}>Sign out</Button>
            </>
          ) : (
            <a href="/login">Sign in</a>
          )}
        </footer>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
