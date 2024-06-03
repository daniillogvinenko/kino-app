import { Layout } from "@/components/Layout";
import cls from "./MoviePage.module.scss";
import { NavLink, useParams } from "react-router-dom";
import { ChangeEvent, useContext, useEffect, useState } from "react";
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
    const [newReviewValue, setNewReviewValue] = useState("");
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

    const handleNewReviewChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewReviewValue(e.target.value);
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

    const handleSendReview = () => {
        const fetchData = async () => {
            const data = await MockApi.postReview(authData?.user?.id, id, newReviewValue);
            return data;
        };

        // todo
        // надо чтобы с сервера приходили только комментарии к конкретному фильму
        fetchData().then((data) => setReviews(data));
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
                                    <br />
                                    <p>{movie?.year}</p>
                                    <br />
                                    <p>{movie?.genres.join(", ")}</p>
                                    <br />
                                    <p>{movie?.country}</p>
                                    <br />
                                    <p>{movie?.duration}</p>
                                    <br />
                                    <p>{movie?.ageLimit}</p>
                                    <Button onClick={handleOpenModal} size="lg">
                                        Смотреть
                                    </Button>
                                    {authData?.user ? (
                                        <Button onClick={handleAddToFavorites} variant="outline" size="lg">
                                            Добавить в избранное
                                        </Button>
                                    ) : null}
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

                    <div className={cls.commentsSection}>
                        <div>Комментарии</div>
                        {authData?.user ? (
                            <div className={cls.newCommentForm}>
                                <input
                                    type="text"
                                    placeholder="Введите комментарий"
                                    value={newReviewValue}
                                    onChange={handleNewReviewChange}
                                />
                                <Button onClick={handleSendReview}>Отправить</Button>
                            </div>
                        ) : null}
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
