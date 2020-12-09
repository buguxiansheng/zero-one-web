import axios from 'axios'
axios.defaults.baseURL="http://localhost:8081/"

axios.interceptors.request.use(
    config=>{
        config.headers['accessToken'] = sessionStorage.getItem('token')
        return config;
    }
)
export default axios