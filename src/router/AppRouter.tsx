import { Route, Routes } from "react-router-dom";
import { routerConfig } from "./routerConfig";

export const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routerConfig).map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
};
