import axios from "axios";

export const galaxyInstance = (params?: any) => {

    const galaxyApi = axios.create({
        baseURL: '/',
        headers: { 'content-type':'application/json; charset=utf-8' },
        ...params
    });

    galaxyApi.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return (Promise.reject(error));
    });
    return galaxyApi;
}


