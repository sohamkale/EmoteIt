import React, {useState, useRef, useEffect, useContext} from 'react'
import axios from "axios";
import {AuthenticationContext} from "../../../../contexts/AuthenticationProvider";
import {useHistory} from "react-router-dom"
import {isMobile} from 'react-device-detect';

export default function AnsweringInterface(props) {
    const {accessToken} = useContext(AuthenticationContext);
    const [insight, setInsight] = useState();
    const messageBreakdown = insight?.secret?.split(' ');
    const [msg, setMsg] = useState("");
    const [hintTaken, setHintTaken] = useState(false)

    const letterParent = useRef();
    const [focusOn, setFocusOn] = useState([0, 0]);
    const [timeLeft, setTimeLeft] = useState();

    const [responseString, setResponseString] = useState([]);
    const history = useHistory();
    let lIndex = 0;


    useEffect(() => {

        if (props.emortionId)
            //make call to notify start of answering
            axios.post(`/api/emortion/insight/${props.emortionId}`, null, {
                headers: {"access-token": accessToken}
            })
                .then((res) => {

                    if (res.data) {
                        setInsight(res.data);
                        const startedTime = new Date(res.data?.createdAt);
                        setTimeLeft(60 - (new Date() - startedTime) / 1000);
                        // console.log(_responseString)
                        setResponseString(res.data?.response);
                    }

                })
                .catch((err) => {
                    setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
                    console.log(err.response);
                })

    }, [props.emortionId]);

    useEffect(() => {
        if (timeLeft <= 0.99)
            _Submit();
        const timer = timeLeft > 0 && setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        // return () => clearInterval(timer);
    }, [timeLeft])

    useEffect(() => {
        if (letterParent.current && focusOn[0] !== 1000 && focusOn[1] !== 1000) {
            letterParent.current?.children[focusOn[0]]?.children[focusOn[1]]?.focus();
        }
    }, [focusOn])

    function _SetFocus(negative) {
        var _focusGroup = focusOn[0];
        var _focusIndex = focusOn[1];

        if (negative) {
            _focusIndex--;
            if (_focusIndex < 0) {
                _focusGroup--;
                if (_focusGroup < 0) {
                    _focusGroup = 0;
                    _focusIndex = 0;
                } else _focusIndex = messageBreakdown[_focusGroup].length - 1
            }
        } else {
            _focusIndex++;
            if (_focusIndex >= messageBreakdown[_focusGroup].length) {
                _focusGroup++
                if (_focusGroup >= messageBreakdown.length) {
                    _focusGroup = messageBreakdown.length - 1
                    _focusIndex = messageBreakdown[_focusGroup].length - 1;
                } else _focusIndex = 0;
            }
        }

        setFocusOn([_focusGroup, _focusIndex]);
    }

    function _Submit() {
        const response = {
            secret: insight?.secret,
            response: responseString,
            deviceId: isMobile ? 0 : 1
        }

        axios.patch(`/api/emortion/insight/${insight?.emortionId}`, response, {
            headers: {
                'access-token': accessToken
            }
        }).then((res) => {
            console.log(res.data);
            history.push(`/app/emortion/${insight?.emortionId}`)

        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);
        })
    }

    function _TakeHint() {
        setHintTaken(true);
        axios.get(`/api/insight/hint/${insight?._id}`, {
            headers: {
                'access-token': accessToken
            }
        }).then((res) => {
            if (res.data) {
                setInsight(res.data);
                const startedTime = new Date(res.data?.createdAt);
                setTimeLeft(60 - (new Date() - startedTime) / 1000);
                // console.log(_responseString)
                setResponseString(res.data?.response);
            }

        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);
        })
    }

    return (
        <div className="bg-light w-100">
            <div className="row">
                <div className={"m-auto text-warning"}>{msg}</div>
            </div>
            {/*Clock Row*/}
            <div className="row m-3 text-align-center">
                <div className={"col"}>
                    <h2><span className="badge badge-dark">00:{timeLeft > 0 ? parseInt(timeLeft) : 0}</span></h2>
                </div>
            </div>

            {
                (insight === undefined || insight === null)?<center><div className="text-center spinner-border"/></center>:
                timeLeft > 0 ?
                    <>
                        {hintTaken ?
                            <></> :
                            <div className="row  m-3 text-align-center">
                                <div className="col">
                                    <button type="button" className="btn btn-danger" onClick={_TakeHint}>
                                        <i className="fa-regular fa-paper-plane m-1"></i>
                                        TAKE HINT
                                    </button>
                                </div>
                            </div>}
                        <div className="row text-align-center m-1" ref={letterParent}>
                            {
                                messageBreakdown?.map((word, index) =>
                                    <React.Fragment key={index}>
                                        <div id={"word"} className={"col-12 row h-25"}
                                             style={{maxWidth: "fit-content"}}>
                                            {
                                                word.split('').map((item, wIndex) =>
                                                    <React.Fragment key={wIndex}>
                                                        {/*{lIndex++}*/}
                                                        <InsightInput key={wIndex} group={index} index={wIndex}
                                                                      letter={item} _SetFocus={_SetFocus}
                                                                      setFocusOn={setFocusOn}
                                                                      responseString={responseString}
                                                                      setResponseString={setResponseString}/>
                                                    </React.Fragment>
                                                )
                                            }
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </React.Fragment>
                                )
                            }

                        </div>

                        <div className="row  m-3 text-align-center">
                            <div className="col">
                                <button type="button" className="btn btn-dark" onClick={_Submit}>
                                    <i className="fa-regular fa-paper-plane m-1"></i>
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <div className="row m-2">
                        <div className="btn btn-outline-danger disabled m-auto">TIME UP &nbsp;
                            <i className="fas fa-sad-tear"></i></div>
                    </div>
            }
            {/* The EmortionInsights Inputs */}


        </div>
    )
}


function InsightInput(iProps) {
    const [color, setColor] = useState("black");

    function _KeyDown(e) {
        if (e.keyCode === 8 || e.keyCode === 37) {

            e.preventDefault();
            iProps._SetFocus(true);
        } else if (e.keyCode === 39)
        {

            e.preventDefault();
            iProps._SetFocus();
        }
    }

    function _HandleOnChange(e) {
        if (e.target.value === " " || e.target.value === "") {
            e.target.value = ""
            return;
        }
        setColor(e.target.value.toLowerCase() === iProps.letter.toLowerCase() ? "green" : "red");
        iProps._SetFocus();

        let _responseString = iProps.responseString;
        let str = _responseString[iProps.group].split('');
        str[iProps.index] = e.target.value;
        str = str.join('');
        _responseString[iProps.group] = str;
        iProps.setResponseString(_responseString);
    }

    function _HandleClick(e) {
        e.target.select();
        iProps.setFocusOn([iProps.group, iProps.index])
        // iProps.setFocusOn(iProps.index);
    }

    return (
        <input maxLength={1} className="form-control insightInput" onKeyDown={_KeyDown} onInput={_HandleOnChange}
               onFocus={_HandleClick} onClick={_HandleClick}
               value={iProps.responseString && iProps.responseString[iProps.group] ?
                   iProps.responseString[iProps.group][iProps.index] : '_'}
               style={{color: color}}
        />
    );
}
