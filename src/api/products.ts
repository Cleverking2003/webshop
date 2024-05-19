import { Product } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const create_review = async (description: string, rating: number, productId: number) => {
   await authAxios.post(`/products/review/${productId}/`, {description, rating})
};

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

export const edit_product = async (data: Product) => {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("desc", data.desc)
    formData.append("amount", data.amount.toString())
    // formData.append("category", data.category.id)
    formData.append("price", data.price.toString())
    await authAxios.put(`/items/${data.id}/`, formData)
};

export const delete_product = async (id: number) => {
    await authAxios.delete(`/items/${id}/`)
};

export const post_product = async (data: Product) => {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("desc", data.desc)
    formData.append("amount", data.amount.toString())
    // formData.append("category", data.category)
    formData.append("price", data.price.toString())
    await authAxios.post('/items/', formData)
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
    const response = await authAxios.post(`/make_purchase/${data.id}/`)
    return response.data;
};
