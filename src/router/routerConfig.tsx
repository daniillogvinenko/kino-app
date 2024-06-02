import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { MoviePage } from "@/pages/MoviePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ReactNode } from "react";

interface Route {
    path: string;
    element: ReactNode;
    authOnly: boolean;
}

export const routerConfig: Record<string, Route> = {
    main: {
        path: "/",
        element: <MainPage />,
        authOnly: false,
    },
    moviePage: {
        path: "/movie/:id",
        element: <MoviePage />,
        authOnly: false,
    },
    profilePage: {
        path: "/:userId",
        element: <ProfilePage />,
        authOnly: false,
    },
    loginPage: {
        path: "/login",
        element: <LoginPage />,
        authOnly: false,
    },
};
