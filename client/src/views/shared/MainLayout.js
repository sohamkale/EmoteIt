import React, {useState, createContext, useEffect} from 'react'
import {Navbar} from "./components/Navbar";
import {RoutesBar} from "./components/RoutesBar";
import axios from "axios";

export const LayoutContext = createContext();

export const MainLayout = (props) => {
    const [pageTitle, setPageTitle] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get('/api/translation/Category').then((res) => {
            setCategories(res.data);
        })
    },[])

    const contextVars = {setPageTitle, categories}

    return (
        <>
            <Navbar/>
            <LayoutContext.Provider value={contextVars}>
                <div className="container-fluid emoteit-page"
                    /*onClick={ResetTabs}*/>
                    <h2>{pageTitle}</h2>
                    <RoutesBar pageLinks={props.pageLinks} adminLinks={props.adminLinks}/>
                    <div className="container">
                        {props.children}
                    </div>
                </div>
            </LayoutContext.Provider>
        </>

    )
}