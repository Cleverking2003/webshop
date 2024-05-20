import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider.tsx";
import toast from "react-hot-toast"
import { useAuthStore } from "./store/auth"
import { Token } from "./Interfaces"
import jwt_decode from "jwt-decode"

const queryClient = new QueryClient();

const ws = new WebSocket("ws://localhost:8000/ws/");
ws.onmessage = (event) => {
    console.log("here")
    const token: string = useAuthStore.getState().access;
    const tokenDecoded: Token = jwt_decode(token)
    const isAdmin = (tokenDecoded.is_staff);  
    if (isAdmin) toast.success(event.data, {
      duration: 1000
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
