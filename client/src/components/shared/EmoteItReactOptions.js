import React from 'react'

export default function EmoteItReactOptions(props){
    return (
        <div className={`react-box ${props.show?"show":""}`}>
            <ul>
                <li data-title="smile">
                    <a href="javascript:void(0)">
                        <img src={require("../../assets/svg/emoji/027.svg").default} alt="smile"/>
                    </a>
                </li>
                <li data-title="love">
                    <a href="javascript:void(0)">
                        <img src={require("../../assets/svg/emoji/113.svg").default} alt="smile"/>
                    </a>
                </li>
                <li data-title="cry">
                    <a href="javascript:void(0)">
                        <img src={require("../../assets/svg/emoji/028.svg").default} alt="smile"/>
                    </a>
                </li>
                <li data-title="wow">
                    <a href="javascript:void(0)">
                        <img src={require("../../assets/svg/emoji/052.svg").default} alt="smile"/>
                    </a>
                </li>
                <li data-title="angry">
                    <a href="javascript:void(0)">
                        <img src={require("../../assets/svg/emoji/039.svg").default} alt="smile"/>
                    </a>
                </li>
                <li data-title="haha">
                    <a href="javascript:void(0)">
                        <img src={require("../../assets/svg/emoji/042.svg").default} alt="smile"/>
                    </a>
                </li>
            </ul>
        </div>
    );
}