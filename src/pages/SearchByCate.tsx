import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { cate_api } from "../api/products";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { Product } from "../Interfaces";
import ProductCard from "../components/ProductCard";

const SearchByCate = () => {

    const { cate } = useParams()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['items', cate],
        queryFn: () => cate_api(cate || ''),
    })

    if (isError) return toast.error("Error!")
    if (isLoading) return <Loader />

    console.log(data)

    return (
        <div className="flex justify-center">
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16">
                
                {data && data.results.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>
        </div>
    )
    
}
export default SearchByCate;
