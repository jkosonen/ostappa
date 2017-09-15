import axios from 'axios';
import auth from '../auth/';

const BASE_URL = 'http://localhost:3001/api';

export default {

    getLists: () => axios.get(BASE_URL + '/lists', { headers: { Authorization: `Bearer ${auth.getToken()}` }}),
    updateList: (list) => axios.patch(BASE_URL + '/lists/' + list.id, { headers: { Authorization: `Bearer ${auth.getToken()}` }}),
    createList: (list) => axios.post(BASE_URL + '/lists', { headers: { Authorization: `Bearer ${auth.getToken()}` }}),
    addItem: (id, item) => axios.post(BASE_URL + '/lists/' + id + '/add', item,  { headers: { Authorization: `Bearer ${auth.getToken()}` }}),
    deleteItem: (id, itemId) => axios.delete(BASE_URL + '/lists/' + id + '/' + itemId,  { headers: { Authorization: `Bearer ${auth.getToken()}` }})
    
}