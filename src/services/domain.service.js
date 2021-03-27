import http from "../http-common";

class DomainDataService {
  getAll() {
    return http.get(`/domains`);
  }
}

export default new DomainDataService();