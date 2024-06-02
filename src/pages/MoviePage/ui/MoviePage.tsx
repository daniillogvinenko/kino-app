import { Layout } from "@/components/Layout";
import cls from "./MoviePage.module.scss";
import { NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "@/components/ui/Button";
import { ReviewCard } from "./ReviewCard/ReviewCard";
import { Modal } from "@/components/ui/Modal";
import { Movie, Review } from "@/types/types";
import { MockApi } from "@/shared/mock-server/server";
import { UserContext } from "@/components/userContext/userContext";

export const MoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | undefined>(undefined);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const authData = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const data = await MockApi.getMovieById(id!);
            return data;
        };

        setIsLoading(true);
        fetchData().then((data) => {
            setMovie(data);
            setIsLoading(false);
        });
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await MockApi.getReviewsByMovieId(id!);
            return data;
        };

        fetchData().then((data) => setReviews(data));
    }, [id]);

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleAddToFavorites = () => {
        const fetchData = async () => {
            const data = await MockApi.addMovieToFavorites(authData?.user?.id, id!);
            return data;
        };

        fetchData().then((data) => {
            authData?.updateUser(data);
        });
    };

    return (
        <Layout>
            <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
                <div className={cls.modalContent}></div>
            </Modal>
            <div className={cls.MoviePage}>
                <div className="container">
                    <NavLink to="/">Назад</NavLink>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div className={cls.flex}>
                                <img src={movie?.mainImg} alt="" />
                                <div>
                                    <p>{movie?.title}</p>
                                    <br />
                                    <p>{movie?.description}</p>
                                    <Button onClick={handleOpenModal} size="lg">
                                        Смотреть
                                    </Button>
                                    <Button onClick={handleAddToFavorites} variant="outline" size="lg">
                                        Добавить в избранное
                                    </Button>
                                </div>
                            </div>
                            <Carousel>
                                {movie?.otherImages.map((img) => (
                                    <img
                                        style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                                        key={img}
                                        src={img}
                                        alt=""
                                    />
                                ))}
                            </Carousel>
                        </>
                    )}

                    <div>
                        <div>Комментарии</div>
                        {reviews.length ? (
                            <div>
                                {reviews?.map((review) => (
                                    <ReviewCard key={review.id} className={cls.reviewCard} review={review} />
                                ))}
                            </div>
                        ) : (
                            <div>Комментариев нету</div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
