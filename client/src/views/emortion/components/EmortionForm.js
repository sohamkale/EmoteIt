import React, {useState, useEffect, useContext} from 'react'
import 'emoji-mart/css/emoji-mart.css'
import {Picker, Emoji} from 'emoji-mart'
import axios from "axios";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";
import {EmojiDiv} from "./EmojiDiv";

export default function EmortionForm(props) {
    const {user, accessToken} = useContext(AuthenticationContext);
    const [msg, setMsg] = useState("");

    const [secret, setSecret] = useState("");
    const [category, setCategory] = useState(0);
    const [expireOpt, setExpireOpt] = useState(0);
    const [adminExpiresAt, setAdminExpiresAt] = useState();
    const [messageEmojis, setMessageEmojis] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [availableCategories, setAvailableCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/translation/Category').then((res) => {
            setAvailableCategories(res.data);
        })
    }, [])

    useEffect(() => {
        setCurrentIndex(messageEmojis.length)
    }, [messageEmojis])

    function _OnEmojiSelected(e) {
        setMessageEmojis([...messageEmojis, e.id]);
    }

    function _PopMessage() {
        var _tmp = [...messageEmojis];
        _tmp.pop();
        setMessageEmojis(_tmp)
    }

    function _OnSecretChange(e) {
        var _value = e.target.value/*.trim()*/;
        var wordCount = _value.split(/\s+/).length;
        if (wordCount > 6)
            return;
        _value = _value;
        setSecret(_value)
    }

    function ResetForm() {
        setSecret("");
        setMessageEmojis([]);
    }

    function SubmitEmortion() {
        let expiresAt = new Date();
        if(user.typeId != 0) {

            let _expireHours = 1;
            _expireHours += expireOpt == 1 ? 2 : expireOpt == 2 ? 23 : 0; // 0 =1 hour, 1= 3 hours and 2= 24 hours. default = 1 hour

            expiresAt.setHours(expiresAt.getHours() + _expireHours )

            console.log(expiresAt)
        } else expiresAt = adminExpiresAt;

        const _emortion = {
            expiresAt, message: messageEmojis, secret:secret.trim(), categoryId: category
        }
        setMsg("");

        if(messageEmojis.length == 0){
            setMsg("please use emojis to express your emortion");
            return;
        }

        if(!secret){
            setMsg("please provide the correct insight for your emortion");
            return;
        }

        axios.post('/api/emortion/emortion', _emortion, {
            headers: {"access-token": accessToken}
        }).then((res) => {
            ResetForm();
            props.GetEmortion();
            setMsg("success!");
        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);
        })
    }

    return (
        <div>
            <div className="card mb-3 emortionCreate">
                <h2 className="card-title bg-light  p-3 display-5">TELL US AN EMORTION!</h2>
                <div className="card-body">
                    <div className="row">
                        <div className={"m-auto text-warning"}>{msg}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-6">
                            <label htmlFor="exampleDataList" className="form-label">Category</label>
                            <select id="postType" name='type' className='form-control'
                                    value={category} onChange={(e) => setCategory(e.target.value)}>
                                {
                                    availableCategories.map((item, index) =>
                                        <option key={index} value={item.rid}>{item.label}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-6">
                            <label className='form-label'>Expires</label>
                            {
                                user?.typeId == 0?
                                    <input type="date" className="form-control" onChange={(e)=>{let date = new Date(e.target.value); date.setUTCHours(23,59,59); setAdminExpiresAt(date)}}/>:
                                    <select id="postType" name='type' className='form-control'
                                            value={expireOpt} onChange={(e) => setExpireOpt(e.target.value)}>
                                        <option value={0}>In 1 Hour</option>
                                        <option value={1}>In 3 Hours</option>
                                        <option value={2}>In 24 Hours</option>
                                    </select>
                            }

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <input style={{fontFamily: 'Ink Free', fontWeight: 'bold'}}
                                   required id="" name="secretAnswer" value={secret} onChange={_OnSecretChange}
                                   className="form-control" placeholder="Your insight in six word max..."/>
                        </div>
                        <div className="col-3">
                            <button className={"btn btn-warning"} onClick={SubmitEmortion}>SUBMIT</button>
                        </div>
                    </div>
                    <div className={"row m-2"}>
                        <div className="alert alert-warning">
                            Tip: Click on the row of your emojis for backspace functionality!
                        </div>
                    </div>
                    <div className="row m-2" onClick={_PopMessage}>
                        {
                            messageEmojis.map((item, index) =>
                                <EmojiDiv key={index} eId={item} setMessageEmojis={setMessageEmojis} index={index}
                                          currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                            )
                        }
                        <EmojiInputCaret index={messageEmojis.length} currentIndex={currentIndex}
                                         setCurrentIndex={setCurrentIndex}/>


                    </div>
                    <div className={"row"}>
                        <Picker style={{width: "100%"}} set={"google"} title={"Powered by EmojiMart"}
                                i18n={{search: 'Search...', categories: {search: 'Searches', recent: 'Recents'}}}
                                onSelect={_OnEmojiSelected}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmojiInputCaret(props) {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timedFunction = setTimeout(() => {
            setShow(!show)
        }, 500);
        // const timedFunction = setInterval(()=>{setShow(!show)},500);
        //
        return () => clearInterval(timedFunction);
    }, [show]);
    return (
        <div className="col-xl-1 col-md-2 col-sm-2 col-2  emojiInput">
            <div>
                {props.index === props.currentIndex && show ? "l" : ""}
            </div>
        </div>
    );
}