import axios from 'axios' 

const instance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
});



instance.interceptors.response.use(function (response) { 
   console.log("response", response)
   return response;
}, function (error) { 
   if (error.response && error.response.status == 401 && error.response.data.token == false) {
      localStorage.clear()
      window.location = "/login"
   } 
   if (!error.response) {
      localStorage.clear();
      window.location = "/maintenance"
   } 
   return Promise.reject(error);
});

export default instance