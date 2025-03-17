import { config, baseUrl } from "../core"
import axios from 'axios'

const authUrl = `http://${baseUrl}/api/users/login`

export const loginApi = async (username, password) => {
    return axios.post(authUrl, {username, password}, config);
}