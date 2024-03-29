import React, {useContext, useEffect, useState} from 'react'
import UserCollection from "./components/UserCollection";
import axios from "axios";
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";
import {RelationshipCollection} from "./components/RelationshipCollection";
import {LayoutContext} from "../shared/MainLayout";

export default function Friends(props) {
    const {setPageTitle} = useContext(LayoutContext);
    useEffect(()=>{setPageTitle("")})
    const {user, accessToken} = useContext(AuthenticationContext);


    const [allUsers, setAllUsers] = useState([]);
    const [relationships, setRelationships] = useState([]);

    function GetRelationships() {
        axios.get(`/api/friendship/request`, {
            headers: {"access-token": accessToken}
        }).then((res) => {
            setRelationships(res.data);
            console.log(res.data)
        });

    }

    console.log(relationships)
    function GetAllUsers() {
        if (relationships)
            axios.get('/api/user/index').then((res) => {
                setAllUsers(res.data?.filter(x => x._id != user._id && !relationships.some(y => y.requesterUserId?._id == x._id || y.requesteeUserId?._id == x._id)));
            });
    }


    function GetUserLists() {
        GetRelationships();
    }

    useEffect(() => {
        GetRelationships();
    }, []);

    useEffect(() => {
        GetAllUsers();

    }, [relationships])
    return (
        <>
            {/*<UserCollection name={"Relationships"} users={relationships} getList={GetUserLists}/>*/}
            <RelationshipCollection relationships={relationships} getList={GetUserLists}/>
            <hr/>
            <UserCollection name={"All Users"} users={allUsers} relationships={relationships} getList={GetUserLists}/>
        </>
    )
}