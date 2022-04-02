import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const erase = (id) => {
  return axios.delete(baseUrl + `/${id}`).then((response) => response.data);
};

const update = (object) => {
  const request = axios.put(baseUrl + `/${object.id}`, object);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  erase,
  update,
};

/* Voisi olla myös muodossa
{ 
  getAll: getAll,
  create: create,
  erase:  erase,
  update: update,
} */
