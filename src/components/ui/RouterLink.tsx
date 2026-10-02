import { Link, useLocation, type LinkProps } from 'react-router-dom';
import { isArtworkDetailPath } from '../../data/artworkPaths';

/**
 * Link that replaces history when leaving an open artwork (lightbox) URL so
 * mobile back/swipe does not reopen the painting after navigating home.
 */
export function RouterLink({ to, replace, ...props }: LinkProps) {
  const { pathname } = useLocation();
  const destPath =
    typeof to === 'string'
      ? to.split(/[?#]/)[0]
      : (to.pathname ?? '/').split(/[?#]/)[0];

  const leaveArtworkDetail =
    isArtworkDetailPath(pathname) && !isArtworkDetailPath(destPath);

  return <Link to={to} replace={replace ?? leaveArtworkDetail} {...props} />;
}
