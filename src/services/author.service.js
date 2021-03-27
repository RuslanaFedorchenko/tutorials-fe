import http from "../http-common";

class AuthorDataService {
  getAll() {
    return http.get(`/authors`);
  }
  create(data) {
    return http.post("/authors", data);
  }

  update(id, data) {
    return http.put(`/authors/${id}`, data);
  }
}

export default new AuthorDataService();