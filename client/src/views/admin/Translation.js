import React, {useState, useContext, useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'
import {LayoutContext} from "../shared/MainLayout";


export default function Translations(props) {
    const {setPageTitle} = useContext(LayoutContext);

    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    const [translations, setTranslations] = useState(null);

    const [newRID, setNewRID] = useState();
    const [newLabel, setNewLabel] = useState("");
    const [newTable, setNewTable] = useState("");


    useEffect(() => {
        setPageTitle("Translations");
        GetTables();
    }, []);


    function GetTables() {
        axios.get('/api/translations').then((res) => {
            setTables(res.data);
        })
    }


    function GetTranslations() {

        const searchTable = tables[selectedTable];
        axios.get('/api/translation/' + searchTable).then((res) => {
            console.log(res.data)
            setTranslations(res.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }

    function AddTranslation(){
        const searchTable = tables[selectedTable];
        const translation = {
            rid: newRID, label: newLabel
        }
        axios.post('/api/translation/' + searchTable,translation).then((res) => {
            console.log(res.data);
            GetTranslations();
        }).catch((err) => {
            console.log(err.message);
        })
    }

    function AddTable(){
        const translation = {
            rid: -1, label: "blank"
        }
        axios.post('/api/translation/' + newTable,translation).then((res) => {
            console.log(res.data);
            GetTables();
            GetTranslations();
        }).catch((err) => {
            console.log(err.message);
        })
    }

    function DeleteTranslation(_translation){
        axios.delete('/api/translation',{data:_translation}).then((res) => {
            console.log(res.data);
            const searchTable = tables[selectedTable];
            GetTables();
            GetTranslations();
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(()=>{
        if(selectedTable!=null){
            GetTables();
            GetTranslations();
        }
    },[selectedTable])



    return (
        <>
            <div className="row">
                <div className="col-4">
                    <table className="table table-hover bg-light">
                        <thead>
                        <tr>
                            <th scope="col">Translation Tables</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            tables?.map((item, index) =>
                                <tr key={index}
                                    className={selectedTable === index ? "tr-clickable selected" : "tr-clickable"}
                                    onClick={() => {
                                        setSelectedTable(index);
                                    }}>
                                    <td>{item}</td>
                                </tr>
                            )
                        }

                        <tr>
                            <td>
                                <input type={"text"} placeholder="New Table" className="form-control"
                                value={newTable} onChange={(e)=>setNewTable(e.target.value)}/>
                            </td>
                            <td>
                                <button className="btn btn-outline-dark mb-3" onClick={AddTable}>
                                    <i className="fas fa-plus"/>
                                </button>
                            </td>
                        </tr>


                        </tbody>
                    </table>
                </div>

                <div className="col-8">

                    <div className="card-title">
                        <h3>{tables[selectedTable]}</h3>
                    </div>

                    <table className="table table-responsive bg-light">
                        <thead>
                        <tr>
                            <th scope="col">RID</th>
                            <th scope="col">Text</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            translations?.map((translation)=>
                                <tr>
                                    <td>
                                        {translation?.rid}
                                    </td>
                                    <td>
                                        {translation?.label}
                                    </td>

                                    <td>
                                        <button className="btn btn-outline-dark mb-3" onClick={()=>DeleteTranslation(translation)}>
                                            <i className="fas fa-trash-alt"/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                        {selectedTable != null?
                            <tr>
                                <td>
                                    <input type="number" className="form-control" value={newRID} onChange={(e)=>setNewRID(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" className="form-control" value={newLabel} onChange={(e)=>setNewLabel(e.target.value)}/>
                                </td>

                                <td>
                                    <button className="btn btn-outline-dark mb-3" onClick={AddTranslation}>
                                        <i className="fas fa-plus"/>
                                    </button>
                                </td>
                            </tr>:
                        <></>}

                        </tbody>
                    </table>

                </div>
            </div>

        </>
    );
}