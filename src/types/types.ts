export interface Movie {
    id: string;
    title: string;
    description: string;
    mainImg: string;
    otherImages: string[];
}

export interface Review {
    id: string;
    userId: string;
    movieId: string;
    text: string;
}

export interface User {
    id: string;
    username: string;
    password: string;
    // массив id фильмов
    favorites: string[];
}
