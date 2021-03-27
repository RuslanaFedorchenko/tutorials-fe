import axios from "axios";

export default axios.create({
  baseURL: "https://spring-boot-react-mysql.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});