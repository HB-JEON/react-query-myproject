import axios, {AxiosInstance} from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiClient;