import { Loading } from 'notiflix/build/notiflix-loading-aio';

export function startLoader() {
  Loading.circle({
    svgColor: '#8C8C8C',
    backgroundColor: 'rgba(0,0,0,0.8)',
    svgSize: '100px',
  });
}

export function stopLoader() {
  Loading.remove(300);
}
