import { Movie, Review, User } from "@/types/types";
import { db } from "./db";

const DELAY = 800;

class API {
    private db = db;

    // MOVIES------------------------------------
    getAllMovies() {
        const res = new Promise<Movie[]>((res) => {
            setTimeout(() => {
                res(this.db.movies);
            }, DELAY);
        });
        return res;
    }

    getMovieById(id: string) {
        const res = new Promise<Movie | undefined>((res) => {
            setTimeout(() => {
                res(this.db.movies.find((movie) => movie.id === id));
            }, DELAY);
        });
        return res;
    }

    getMoviesBySearch(search: string) {
        if (!search) {
            return new Promise<Movie[]>((res) => {
                setTimeout(() => {
                    res([]);
                }, DELAY);
            });
        }
        // lower case search
        const lcSearch = search.toLowerCase();

        return new Promise<Movie[]>((res) => {
            setTimeout(() => {
                res(
                    this.db.movies.filter(
                        (movie) =>
                            movie.title.toLowerCase().includes(lcSearch) ||
                            movie.description.toLowerCase().includes(lcSearch)
                    )
                );
            }, DELAY);
        });
    }

    // возвращает список избранных фильмов, по id пользователя
    getFavoriteMoviesByUserId(id: string) {
        const favoritesIds = this.db.users.find((user) => user.id === id)?.favorites;

        return new Promise<Movie[]>((res) => {
            setTimeout(() => {
                res(this.db.movies.filter((movie) => favoritesIds?.includes(movie.id)));
            }, DELAY);
        });
    }

    // REVIEWS------------------------------------
    getReviewsByMovieId(id: string) {
        return new Promise<Review[]>((res) => {
            setTimeout(() => {
                res(this.db.reviews.filter((review) => review.movieId === id));
            }, DELAY);
        });
    }

    postReview(userId: string, movieId: string, text: string) {
        return new Promise<Review[]>((res) => {
            setTimeout(() => {
                const newId = (Math.max(...this.db.reviews.map((review) => +review.id)) + 1).toString();
                this.db.reviews.push({ id: newId, movieId, text, userId });

                res(this.db.reviews.filter((review) => review.movieId === movieId));
            }, DELAY);
        });
    }

    // USERS------------------------------------
    getUserById(id: string) {
        return new Promise<User | undefined>((res) => {
            setTimeout(() => {
                res(this.db.users.find((user) => user.id === id));
            }, DELAY);
        });
    }

    login(username: string, password: string) {
        return new Promise<User>((res, rej) => {
            setTimeout(() => {
                const user = this.db.users.find((user) => user.username === username);

                if (!user) {
                    return rej({ message: "User not found" });
                }

                if (user?.password !== password) {
                    rej({ message: "Wrong password" });
                }

                res(user);
            }, DELAY);
        });
    }

    addMovieToFavorites(userId: string, movieId: string) {
        return new Promise<User>((res, rej) => {
            setTimeout(() => {
                const user = this.db.users.find((user) => user.id === userId);

                if (!user) {
                    return rej({ message: "User not found" });
                }

                user?.favorites.push(movieId);
                res(user);
            }, DELAY);
        });
    }
}

export const MockApi = new API();
