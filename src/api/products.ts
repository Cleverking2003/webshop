import { Product } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const cate_api = async (category: string) => {
    const response = await authAxios.get(`/items/?category=${category}`)
    return response.data;
};

export const brand_api = async (brand: string) => {
    const response = await authAxios.get(`/items/?brand=${brand}`)
    return response.data;
};

export const search_prod = async (query: string) => {
    const response = await authAxios.get(`/items/?name=${query}`)
    return response.data;
};

export const get_solo = async (slug: string) => {
    console.log(slug)
    const response = await authAxios.get(`/items/${slug}/`)
    return response.data
};

export const get_solo_prod = async (id: number) => {
    const response = await authAxios.get(`/items/${id}/`)
    return response.data
};

export const get_products = async ({ pageParam = 1 }) => {
    const response = await axi.get(`/items/?page=${pageParam}&pages=9`)
    return response.data
};

export const get_categories = async ({ pageParam = 1 }) => {
    const response = await axi.get(`/categories/?page=${pageParam}&pages=9`)
    return response.data
};

export const get_brands = async ({ pageParam = 1 }) => {
    const response = await axi.get(`/brands/?page=${pageParam}&pages=9`)
    return response.data
};

export const buyProduct = async (data: Product) => {
    return await authAxios.post(`/make_purchase/${data.id}/`).then(
        (response) => {
            console.log(response)
            return response.data
        }
    ).catch(
        (error) => Promise.reject(error.response.data.errors)
    )
};
