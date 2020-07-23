import axios from 'axios';

const Api = axios.create({
  // baseURL: "http://192.168.1.3/MHD-API/api/",
  baseURL: "https://mhd-api.000webhostapp.com/api/",
  // headers: {
  //   'X-Requested-With': "XMLHttpRequest",
  //   'Content-Type': "application/json",
  // }

});

  export default Api;