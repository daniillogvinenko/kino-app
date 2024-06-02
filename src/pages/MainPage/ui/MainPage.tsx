import { Layout } from "@/components/Layout";
import cls from "./MainPage.module.scss";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Movie } from "@/types/types";
import { MockApi } from "@/shared/mock-server/server";

export const MainPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await MockApi.getAllMovies();
            return data;
        };

        setIsLoading(true);
        fetchData().then((data) => {
            setMovies(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <Layout>
            <div className="container">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={cls.wrapper}>
                        {movies.map((movie) => (
                            <div key={movie.id} className={cls.card}>
                                <div className={cls.imgWrapper}>
                                    <img className={cls.img} src={movie.mainImg} alt="" />
                                </div>
                                <p className={cls.title}>{movie.title}</p>
                                <p className={cls.description}>{movie.description}</p>
                                <Button href={`/movie/${movie.id}`}>Подбронее</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};
