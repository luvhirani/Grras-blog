import axios from "axios";

const publicAxios = axios.create({
    baseURL: 'http://localhost:8000'
  })

  export default publicAxios;