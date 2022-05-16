import React, {useState, useRef, useEffect} from 'react'
import UserTitle from "../shared/UserTitle";

export default function AnsweringInterface(props){
    const letterParent = useRef([]);
    const messageBreakdown = props.emortion.message.split(' ');
    const [focusOn, setFocusOn] = useState([0,0]);

    useEffect(()=>{
        if(focusOn[0]!==1000 && focusOn[1]!==1000)
        {
            letterParent.current.children[focusOn[0]].children[focusOn[1]].focus();
        }
    },[focusOn])

    function _SetFocus(negative){
        var _focusGroup = focusOn[0];
        var _focusIndex = focusOn[1];

        if(negative){
            _focusIndex--;
            if(_focusIndex<0){
                _focusGroup--;
                if(_focusGroup<0)
                {
                    _focusGroup = 0;
                    _focusIndex = 0;
                }
                else _focusIndex = messageBreakdown[_focusGroup].length-1
            }
        }
        else {
            _focusIndex++;
            if(_focusIndex>=messageBreakdown[_focusGroup].length){
                _focusGroup++
                if(_focusGroup>=messageBreakdown.length)
                {
                    _focusGroup=messageBreakdown.length-1
                    _focusIndex = messageBreakdown[_focusGroup].length-1;
                }
                else _focusIndex = 0;
            }
        }

        setFocusOn([_focusGroup,_focusIndex]);
    }

    function _Submit(letterParent) {
        let matchedWords = 0;
        let wordCount = letterParent.current.children.length;
        for(let i =0; i<wordCount;i++){
            let wordLetterCount = letterParent.current.children[i].children.length;
            let matchedLetters = 0;
            for(let j = 0; j<wordLetterCount; j++){
                let letterColor = letterParent.current.children[i].children[j].style.color;
                if(letterColor === "green"){
                    matchedLetters++;
                }
            }
            if(matchedLetters === wordLetterCount){
                matchedWords++
            }
        }
        const returnValue = matchedWords * 10;
        console.log(returnValue);
    }

    return (
        <div className="comment-section" style={{backgroundColor: "rgba(255,232,192,0.1)"}}>
            <div className="comments d-block">
                <div className="row">
                    <div className={"col-2"} style={{marginLeft:"auto"}}>
                        <h2><span className="badge badge-dark">00:59</span></h2>
                    </div>
                </div>
                <div className="row justify-content-center p-3 letterParent" ref={letterParent}>
                    {
                        messageBreakdown.map((word, index)=>
                            <>
                                <div id={"word"} className={"col-12 row h-25"} style={{maxWidth:"fit-content"}}>
                                    {
                                        word.split('').map((item, wIndex)=>
                                            <InsightInput group={index} index={wIndex} letter={item} _SetFocus={_SetFocus}
                                                          setFocusOn={setFocusOn}/>
                                        )
                                    }
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </>
                        )
                    }
                    {/*{
                        props.emortion?.message.split('').map((item)=>
                            item === ' '? <SpaceCharacter/>:
                                <InsightInput letter={item} _SetFocus={_SetFocus} setFocusOn={setFocusOn}/>
                        )
                    }*/}
                </div>
            </div>
            <div className="post-react">
                <ul>
                    <li className="react-btn">
                        <a className="react-click" onClick={() => _Submit(letterParent)} >
                            <i className="fas fa-paper-plane mr-3"/>
                            SUBMIT
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    )
}


function InsightInput(iProps){
    const [color,setColor] = useState("black");
    function _KeyDown(e){
        if (e.keyCode === 8 || e.keyCode === 37) {
            iProps._SetFocus(true);
        }
        else if(e.keyCode === 39)
            iProps._SetFocus();
    }

    function _HandleOnChange(e){
        if(e.target.value===" " || e.target.value==="") {
            e.target.value = ""
            return;
        }
            setColor(e.target.value.toLowerCase() === iProps.letter.toLowerCase() ? "green":"red");
            iProps._SetFocus();
    }

    function _HandleClick(e){
        e.target.select();
        iProps.setFocusOn([iProps.group,iProps.index])
        // iProps.setFocusOn(iProps.index);
    }
    return(
        <input maxLength={1} className="form-control insightInput" onKeyDown={_KeyDown} onInput={_HandleOnChange}
               onFocus={_HandleClick} onClick={_HandleClick}
               style={{color:color}}
        />
    );
}
