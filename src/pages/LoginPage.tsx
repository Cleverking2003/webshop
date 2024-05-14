import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import Loader from "../components/Loader";

const LoginPage = () => {

    const navigate = useNavigate();
    const { isAuth } = useAuthStore();
    const setToken = useAuthStore((state) => state.setToken);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationFn: () => loginRequest(name, password),
        onSuccess: (response) => {
            setToken(response.data.access, response.data.refresh)
            toast.success("Вход выполнен успешно!")
            navigate("/")
        },
        onError: () => {
            toast.error("Произошла ошибка, повторите позже")
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginMutation.mutate()
    }

    if (loginMutation.isLoading) return <Loader/>
    if (isAuth) return (<Navigate to="/"/>)

    return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[800px] lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" 
                    src="/logo.png"
          alt="logo"/>
          <span>CKShop</span>
        </Link>
        <div className="w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Войти в CKShop
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя пользователя</label>
                <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Имя пользователя"/>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Войти</button>
            </form>
          </div>
        </div>
      </div>
    )
    
}
export default LoginPage;
