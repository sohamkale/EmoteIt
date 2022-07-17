import React, {useEffect, useState} from 'react'
import UserCard from "../../shared/components/UserCard";
export default function UserCollection(props){

    const [searchValue, setSearchValue] = useState("");
    const [filteredList, setFilteredList] = useState();

    useEffect(()=>{
        setFilteredList(props.users);
    },[props.users])

    function SearchUsers(e){
        const searchValue = e.target.value.toLowerCase();
        if(searchValue)
            setFilteredList(props.users?.filter(x=>x.name.toLowerCase().includes(searchValue)));
        if(!searchValue || searchValue == "" || searchValue == null)
            setFilteredList(props.users);
    }

    return(
        <div className="card mb-3">
            <div className="card-header">

                <div className="row">
                    <h5 className="card-title">{props.name}</h5>
                    <div className="ml-auto">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                        onChange={SearchUsers}/>
                    </div>

                </div>

            </div>
            <div className="card-body overflow-auto" style={{height: "500px"}}>
                <div className="row  h-50">
                    {filteredList?.map((user)=>
                        <UserCard user={user} getList={props.getList}/>
                    )}
                </div>
            </div>
        </div>

    )
}