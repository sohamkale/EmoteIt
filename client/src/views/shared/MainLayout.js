import React, {useState, createContext} from 'react'
import {Navbar} from "./components/Navbar";
import {RoutesBar} from "./components/RoutesBar";

export const LayoutContext = createContext();

export const MainLayout = (props) => {
    const [pageTitle, setPageTitle] = useState("");
    const contextVars = {setPageTitle}
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