import baseAxios from 'axios';
import router from '@/router'; // Import your Vue Router instance

const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.response.use(
  response => response,
  error => {
    console.log('error', error)
    if (error.response && error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axios;