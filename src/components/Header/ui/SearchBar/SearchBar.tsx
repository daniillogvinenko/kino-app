import { ChangeEvent, useEffect, useState } from "react";
import cls from "./SearchBar.module.scss";
import { Movie } from "@/types/types";
import { MockApi } from "@/shared/mock-server/server";
import { NavLink } from "react-router-dom";

export const SearchBar = () => {
    const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResultItems, setSearchResultItems] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await MockApi.getMoviesBySearch(searchValue);
            return data;
        };

        fetchData().then((data) => setSearchResultItems(data));
    }, [searchValue]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleOpenSearch = () => {
        setIsSearchOpened(true);
    };

    const handleCloseSearch = () => {
        setIsSearchOpened(false);
        setSearchValue("");
    };

    if (!isSearchOpened) {
        return <p onClick={handleOpenSearch}>Search</p>;
    }

    return (
        <div className={cls.SearchBar}>
            <div className={cls.inputWrapper}>
                <input className={cls.input} type="text" value={searchValue} onChange={handleSearchChange} />
                <button onClick={handleCloseSearch}>close</button>
            </div>
            {searchResultItems.length ? (
                <ul className={cls.searchResults}>
                    {searchResultItems.map((movie) => (
                        <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                            <li>
                                <img src={movie.mainImg} alt="" />
                                <div>
                                    <p>{movie.title}</p>
                                    <p>{movie.description}</p>
                                </div>
                            </li>
                        </NavLink>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};
