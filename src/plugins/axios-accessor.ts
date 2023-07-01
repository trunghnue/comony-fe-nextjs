// accessor.ts
import { $axios, initializeAxios } from "@/plugins/axios";

const accessor = () => {
  initializeAxios();

  $axios.interceptors.request.use((config: any) => {
    // Assuming you have the required properties in your config object
    config.headers.Accept = "application/json";
    config.headers[process.env.NEXT_PUBLIC_API_KEY_NAME!] = process.env.NEXT_PUBLIC_API_KEY_VALUE;
    config.headers[process.env.NEXT_PUBLIC_FRONT_SERVER_KEY_NAME!] = process.env.NEXT_PUBLIC_FRONT_SERVER_KEY_VALUE;

    // Do the same user information that works in a separate tab
    // if (typeof window !== 'undefined') {
    //   const localstrageToken = localStorage.getItem('auth._token.local');
    //   const authToken = config.store.$auth.getToken('local');

    //   if (authToken && localstrageToken !== authToken) {
    //     location.reload();
    //   }
    // }

    return config;
  });

  $axios.interceptors.response.use((response) => {
    return Promise.resolve(response);
  });

  $axios.interceptors.response.use(undefined, (axiosErr) => {
    // const code = axiosErr.response?.status ? axiosErr.response.status : 500;
    // const errorMessage = axiosErr.response?.data.message

    // if (req.$auth.loggedIn && code === 401) {
    //   req.$auth.logout();
    //   res.redirect('/login');
    // }

    return Promise.reject(axiosErr);
  });
};

export default accessor;
