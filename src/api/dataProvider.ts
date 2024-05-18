import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { authAxios } from './useAxios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const httpClient = fetchUtils.fetchJson;

export default {
    getList: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json, headers } = await httpClient(url);
        return {
            data: json.results,
            total: json.count
        };
    },

    getOne: async (resource: string, params: any) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        const { json } = await httpClient(url);
        return { data: json };
    },

    getMany: async (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url);
        return { data: json.results };
    },

    getManyReference: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json, headers } = await httpClient(url);
        return {
            data: json.results,
            total: json.count
        };
    },

    create: async (resource: string, params: any) => {
        console.log(params.data)
        if (resource === 'images') {
            const formData = new FormData();
            params.data.image_file.rawFile && formData.append("image_file", params.data.image_file.rawFile);
            formData.append('item', params.data.item);
            console.log(formData);
            const response = await authAxios.post(`${apiUrl}/${resource}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            )
            return { data: response.data };
        }
        const { json } = await httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
        return { data: json };
    },

    update: async (resource: string, params: any) => {
        const url = `${apiUrl}/${resource}/${params.id}/`;
        if (resource === 'images') {
            const formData = new FormData();
            params.data.image_file.rawFile && formData.append("image_file", params.data.image_file.rawFile);
            formData.append('item', params.data.item);
            console.log(formData);
            const response = await authAxios.put(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            )
            return { data: response.data };
        }
        else {
            const { json } = await httpClient(url, {
                method: 'PUT',
                body: JSON.stringify(params.data)
            },
            )
            return { data: json };
        }
    },

    updateMany: async (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        return { data: json };
    },

    delete: async (resource: string, params: any) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
        });
        return { data: json };
    },

    deleteMany: async (resource: string, params: any) => {
        await params.ids.map(async (id: any) => {
            const url = `${apiUrl}/${resource}/${id}/`;
            await httpClient(url, {
                method: 'DELETE',
                body: JSON.stringify(params.data),
            });
        })

        return { data: params.ids };
    },
};
