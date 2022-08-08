import React, {useContext, useState} from 'react'
import axios from "axios";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";
import {DisplayPicture} from "./DisplayPicture";
import {Link} from "react-router-dom";

export const SearchBox = () => {
    const {user, accessToken, SignOut} = useContext(AuthenticationContext);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    function SearchProfile() {
        axios.get(`/api/profile/search?key=${searchValue}&limit=5`,
            {
                headers: {
                    "access-token": accessToken
                }
            }).then((res) => {
            console.log(res.data)
            setSearchSuggestions(res.data);
        })
    }

    function OnSearchValueChange(e) {
        const newValue = e.target.value;
        setSearchValue(newValue);
        if (newValue.length > 3)
            SearchProfile();
        if (newValue.length == 0)
            setSearchSuggestions([]);
    }

    return (
        <form className="form-inline d-flex">
            <input className="form-control form-control-sm" type="text" placeholder="Find Friends..."
                   value={searchValue} onChange={OnSearchValueChange}
                   id="menu1" data-toggle="dropdown"/>
            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                {searchSuggestions.map((item,index) =>
                    <Link key={index} to={`/app/profile/${item._id}`}>
                        <li className="p-1 border-bottom" role="presentation">
                            <DisplayPicture user={item} width={30}/>
                            <span className="ml-1">{item.name} ({item.score})</span>
                        </li>
                    </Link>
                )}
            </ul>
        </form>

    )
}