import { loginRequest } from "./users";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode"
import { Token } from "../Interfaces";

export const authProvider = {
    // called when the user attempts to log in
    login: ({ username, password }: { username: any, password: any }) => {
        return loginRequest(username, password);
    },
    // called when the user clicks on the logout button
    logout: () => {
        useAuthStore().logout();
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            useAuthStore().logout();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        const { isAuth } = useAuthStore();
        return isAuth ? Promise.resolve() : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        // const { isAuth } = useAuthStore();
        // if(isAuth) {
        //     const token: string = useAuthStore.getState().access;
        //     const tokenDecoded: Token = jwt_decode(token);
        //     console.log(tokenDecoded)
        //     return tokenDecoded.is_staff ? Promise.resolve() : Promise.reject();
        // } 
        // else {
        //     return Promise.reject();
        // }
        return Promise.resolve();
    },
};
