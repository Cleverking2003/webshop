import { Link } from "react-router-dom";
import { get_brands, get_categories } from "../api/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Brand, Category } from "../Interfaces";

const BrandPage = () => {

    const {
        data,
        isLoading,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(["items"], get_brands, {
        getNextPageParam: (page: any) => page.next,
    });
    if (error instanceof Error) return <>{toast.error(error.message)}</>;

    return (
        <>
            {
                data?.pages.map((page: any) => (
                    <div className="flex justify-center">
                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16">

                            {page.results.map((brand: Brand) => (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <Link to={`/brand/${brand.id}`}>
                                        <img
                                            className="rounded-t-lg"
                                            src="/static/logo.png"
                                            alt=""
                                        />
                                    </Link>
                                    <div className="p-5 ">
                                        <Link to={`/brand/${brand.id}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {brand.name}
                                            </h5>
                                            <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{brand.desc}</p>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                ))
            }
        </>
    );
};
export default BrandPage;
