import React, {useEffect, useState} from 'react'
import UserCard from "../../shared/components/UserCard";

export const RelationshipCollection = (props)=>{

    const [filteredList, setFilteredList] = useState();

    useEffect(()=>{
        setFilteredList(props.relationships);
    },[props.relationships])

    function SearchUsers(e){
        const searchValue = e.target.value.toLowerCase();
        if(searchValue)
            setFilteredList(props.relationships?.filter(x=>x.targetUser.name.toLowerCase().includes(searchValue)));
        if(!searchValue || searchValue == "" || searchValue == null)
            setFilteredList(props.relationships);
    }

    return ( <div className="card mb-3">
        <div className="card-header">

            <div className="row">
                <h5 className="card-title">Relationships</h5>
                <div className="ml-auto">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                           onChange={SearchUsers}/>
                </div>

            </div>

        </div>
        <div className="card-body overflow-auto" style={{height: "500px"}}>
            <div className="row h-50">
                {filteredList?.map((relationship)=>
                    <UserCard user={relationship.targetUser} getList={props.getList} relationship={relationship}/>
                )}
            </div>
        </div>
    </div>
    )
}