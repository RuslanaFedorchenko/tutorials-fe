import axios from "axios";

export default axios.create({
  baseURL: "https://labfourruslana.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});
