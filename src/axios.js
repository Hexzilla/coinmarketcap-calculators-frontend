import axios from 'axios';
import { SERVER_API } from './constants/constants'

export const Axios = axios.create({
  baseURL: SERVER_API
});
export default Axios;
