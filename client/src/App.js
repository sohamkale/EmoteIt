import React, {useState, useEffect} from 'react'
import './App.css';
import '../src/assets/scss/style.scss'
import EmoteItRouter from "./Routes";
import {user} from "./FakeData";
import {AuthenticationProvider} from "./components/contexts/AuthenticationProvider";
import {CookiesProvider} from "react-cookie";

function App() {

    return (
        <div id="emoteit-app-top" className="">
            <CookiesProvider>
                <AuthenticationProvider>
                    <EmoteItRouter/>
                </AuthenticationProvider>
            </CookiesProvider>
        </div>
    );
}

export default App;
