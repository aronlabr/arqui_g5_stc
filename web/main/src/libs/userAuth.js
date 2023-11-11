import { redirect, usePathname, useRouter } from 'next/navigation';

const users = [
  { id: 1, user: 'admin', pass: '123', point: '/dashboard' },
  { id: 2, user: 'operador', pass: '123', point: '/agregar' },
];

const checkAuth = (user, pass) => {
  for (const userData of users) {
    if (userData.user === user && userData.pass === pass) {
      console.log('Good');
      saveIdLS('auth', userData.id);
      saveIdLS('point', userData.point);
      return [userData.id, userData.point];
    }
  }
  return [0, '/'];
};

const getLS = (key) => JSON.parse(localStorage.getItem(key));
const inLS = (key) => localStorage.hasOwnProperty(key);
const clearLS = () => localStorage.clear();
const delFromLS = (key) => localStorage.removeItem(key);

const saveIdLS = (key, val) => {
  if (inLS(key)) delFromLS(key);
  localStorage.setItem(key, JSON.stringify(val));
};

const useAuth = () => {
  const pathname = usePathname();
  if (pathname !== '/' && !(inLS('auth') && inLS('point'))) {
    // You can use router.push here if needed
    redirect('/');
  } else if (pathname === '/' && inLS('point')) {
    const point = getLS('point');
    redirect(point);
  }
};
export { checkAuth, useAuth, getLS, inLS, clearLS };
