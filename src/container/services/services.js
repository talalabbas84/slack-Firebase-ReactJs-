import { api } from './apiServices';
const model = 'todos';
export const service = {
  login: token => {
    return api.invoke('POST', `${model}/login`, { token });
  },
  addItem: item => {
    return api.invoke('POST', `${model}/`, item);
  },
  getItems: () => {
    return api.invoke('GET', `${model}/`);
  },
  deleteItem: id => {
    return api.invoke('DELETE', `${model}/${id}`);
  }
};
