import { galaxyInstance } from "./Base";

export const add = (params?: any) => {
    return galaxyInstance().get(`/ganymede/strategies/`, { params: params })
}