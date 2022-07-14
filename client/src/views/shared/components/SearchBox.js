import React from 'react'

export const SearchBox = ()=>{
    return (
        <div className="form-inline">
            <i data-feather="search" className="fas fa-search text-white m-2"></i>
            <input className="form-control mr-sm-2" type="search" placeholder="Find Friends..." aria-label="Search"/>
        </div>
    )
}