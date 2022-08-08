import React, {useState, useEffect} from 'react'
import '../src/assets/scss/main.scss'
import EmoteItRouter from "./Routes";
import {AuthenticationProvider} from "./contexts/AuthenticationProvider";
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
