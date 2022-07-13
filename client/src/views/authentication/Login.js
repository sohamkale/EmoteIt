import React from 'react'
import {useContext, useState} from "@types/react";
import {AuthenticationContext} from "../../components/contexts/AuthenticationProvider";
import axios from "axios";

export const Login = ()=>{
    const {user, accessToken, SignIn, SignOut} = useContext(AuthenticationContext);
    //for new users
    const [name, setName] = useState();
    const [dob, setDob] = useState();

    function CreateUser(){
        axios.post('/api/user/authenticate',{
            name: name, DOB: dob
        },{ headers:{"access-token": accessToken} })
            .then((res)=>{
                window.location.reload();
            })
    }
}