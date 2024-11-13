import axios from "axios";
import { ElMessage } from "element-plus";

export const request = axios.create({
})

// const baseURL = "http://localhost:8000/";
// const baseURL = `${window.location.origin}`;
const baseURL = ''
let messageInstance = null;

const service = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 15000,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    //   'token': new URLSearchParams(location.search).get('token') || ''
    },
  })

  //http request interceptors
service.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        //set request header
        // config.headers = {
        //     'Content-Type': 'application/json'
        // };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//http response interceptors
service.interceptors.response.use(
    response => {
        const res = response.data;
        if ((res.code == 200) || !res.code) {
            return res;
        } else {
            if(!messageInstance) {
                messageInstance =ElMessage.error(res.message || res.msg || 'Error')
            } else {
                messageInstance.close();
                ElMessage.error(res.message || res.msg || 'Error')
            }
            return Promise.reject(new Error(res.message || res.msg || 'Error'))
        }
    },
    error => {
        if(!messageInstance) {
            messageInstance =ElMessage.error(error.message || 'Error')
        } else {
            messageInstance.close();
            ElMessage.error(error.message || 'Error')
        }
        return Promise.reject(error)
    }
)

/**
 * Get function encapsulation
 * @param url
 * @param data
 * @returns {Promise}
 */
 // 记住get请求中，params是固定的写法，一定要记住这一点
 export async function get(url, params = {}, suffix = 'data') {
    // return new Promise((resolve, reject) => {
    //     service.get(url, {
    //             params: params
    //         })
    //         .then(response => {
    //             resolve(response.data);
    //         })
    //         .catch(err => {
    //             reject(err)
    //         })
    // })
    return service.get(url, {
        params: params
    })
    .then(response => {

        return suffix ? response[suffix] : response;
    })
    .catch(err => {
        throw err
    })
}

/**
 * Post function encapsulation
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
