import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const publicPaths = ['/auth'];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user && !publicPaths.includes(router.pathname)) {
      router.push('/auth');
    }
  }, [router.pathname]);

  return children;
};

export default AuthGuard;