import { toast } from 'react-toastify';

export const toastError = (msg) => {
  return toast.error(`${msg}`, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
export const toastSuccess = (msg) => {
  return toast.success(`${msg}`, {
    position: 'bottom-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
export const toastWarn = (msg) => {
  return toast.warn(`${msg}`, {
    position: 'top-center',
    color: 'black',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
};
