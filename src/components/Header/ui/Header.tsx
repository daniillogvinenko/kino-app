import { memo, useContext } from "react";
import cls from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "@/components/userContext/userContext";
import { SearchBar } from "./SearchBar/SearchBar";

export const Header = memo(() => {
    const authData = useContext(UserContext);

    return (
        <div className={cls.Header}>
            <div className="container">
                <div className={cls.flex}>
                    <NavLink to="/">
                        <div className={cls.logo}>Home</div>
                    </NavLink>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        {authData?.user ? (
                            <NavLink to={`/${authData?.user?.id}`}>
                                <p>{authData?.user?.username}</p>
                            </NavLink>
                        ) : (
                            <NavLink to="/login">
                                <div>Войти</div>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
