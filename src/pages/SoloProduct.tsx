import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { buyProduct, get_solo } from "../api/products";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Image, Token } from "../Interfaces";
import ImageGallery from "react-image-gallery";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode"

const SoloProduct = () => {

    console.log(useParams());
    const { id } = useParams();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['items', id],
        queryFn: () => get_solo(id || ''),
    })
    
    const token: string = useAuthStore.getState().access;
    const tokenDecoded: Token = jwt_decode(token);
    const user_id = tokenDecoded.user_id;

    const ws = new WebSocket("ws://localhost:8000/ws/");

    if (isError) return toast.error("Ошибка!")
    if (isLoading) return <Loader />


    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {data.name} 
                        <span className="text-green-300 ml-4">
                        {data.price} ₽
                        </span>
                    </h2>

                    <button
                        onClick={() => {
                            buyProduct(data).then(
                                (response) => {
                                    toast.success(`Вы купили ${response.name}!`)

                                    ws.send(JSON.stringify(
                                        {
                                            item: data.id,
                                            user: user_id
                                        }
                                    ));
                                }
                            ).catch(
                                (error) => { 
                                    toast.error(`${error}`)
                                }
                            )
                        }}
                        className="mb-2 inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Купить
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>

                </div>
                <div className="col-span-2">
                    <ImageGallery showFullscreenButton={false} showPlayButton={false} items={data.images.map((i: Image) => (
                        { original: i.image_file, thumbnail: i.image_file }
                    ))}/>
                </div>
                <div className="mb-3 text-2xl font-bold text-gray-700 dark:text-gray-400">
                    <p>
                        Категория: {data.category_full.name}
                    </p>
                    <p>
                        Бренд: {data.brand_full.name}
                    </p>
                    <p>
                        Количество: {data.amount}
                    </p>
                </div>
                <p className="mb-4 font-normal text-gray-400 text-2xl col-span-2">{data.desc}</p>
            </div>
        </div>
    );
};
export default SoloProduct;
