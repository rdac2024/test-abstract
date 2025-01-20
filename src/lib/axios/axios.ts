import axios from "axios";

// interceptors
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});
axios.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    config.timeout = 30000;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export function getAxios({ url, params = {}, headers = {} }: { url: string, params?: any, headers?: any }) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
            headers
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}

export function postAxios({ url, data, headers = {} }: { url: string, data?: any, headers?: any }) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: "post",
            data,
            headers
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}

export default axios;