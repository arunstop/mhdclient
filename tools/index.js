import axios from 'axios';

export const Api = axios.create({
  baseURL: "http://192.168.1.3/MHD-API/api/",
  // baseURL: "https://mhd-api.000webhostapp.com/api/",
  headers: {
    //   'X-Requested-With': "XMLHttpRequest",
    'Content-Type': "multipart/form-data",
  }

});

const imgurClientId = "70bd9800f118bdf";

export const ApiImgur = axios.create({
  baseURL: "https://api.imgur.com/3/",
  headers: {
    'Authorization': "Client-ID " + imgurClientId,
    'Content-Type': "multipart/form-data",
  }

});

export const ApiKeyYT = "AIzaSyDQj3SuEJ-GPvJkcXK_reIB5fn3hmH0-tw";
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=cb3-Cm3Al3c&key=AIzaSyDQj3SuEJ-GPvJkcXK_reIB5fn3hmH0-tw
export const ApiYoutube = axios.create({
  baseURL: "http://192.168.1.3/ytdummy/",
  // baseURL: "https://www.googleapis.com/youtube/v3/",
  headers: {
    'Content-Type': "multipart/form-data",
  }

});

export const ApiYoutube1 = axios.create({
  baseURL: "http://192.168.1.3/ytdummy/",
  // baseURL: "https://www.googleapis.com/youtube/v3/",
  headers: {
    'Content-Type': "multipart/form-data",
  }

});

export default Api;