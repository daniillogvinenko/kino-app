import { Layout } from "@/components/Layout";
import cls from "./ProfilePage.module.scss";
import { useContext, useEffect, useState } from "react";
import { Movie } from "@/types/types";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { MockApi } from "@/shared/mock-server/server";
import { UserContext } from "@/components/userContext/userContext";

export const ProfilePage = () => {
    const { userId } = useParams<{ userId: string }>();
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>();

    const authData = useContext(UserContext);

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                const data = await MockApi.getFavoriteMoviesByUserId(userId);
                return data;
            };

            fetchData().then((data) => setFavoriteMovies(data));
        }
    }, [userId]);

    if (!authData?.user) {
        return <Navigate to="/" />;
    }

    return (
        <Layout>
            <div className={cls.ProfilePage}>
                <div className="container">
                    <div>
                        <p>Профиль</p>
                        <p>Имя пользователя: {authData?.user?.username}</p>
                        <p>Дата регистрации: {authData?.user?.username}</p>
                        <p>Оставлено комментариев: {authData?.user?.username}</p>
                        <Button>Изменить данные</Button>
                        <Button variant="secondary" onClick={authData?.signOut}>
                            Выйти
                        </Button>
                    </div>
                    <div>
                        <p>Любимые фильмы</p>
                        <ul>
                            {favoriteMovies?.map((fav) => (
                                <div key={fav.id}>{fav.title}</div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
