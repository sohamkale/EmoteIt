import React, {useEffect, useState} from "react";

const data = {
    title: "FAQ (Frequently Asked Questions)",
    rows: [
        {
            title: "How to Login to Emote-It",
            content: `You are identified using your google account and credentials.Emote it uses Google oAuth1.0
             for authentication. Login through the home page using your google account.
              You must have a google account in order to use emote it.`,
        },
        {
            title: "What is an Emortion",
            content: `An Emortion is like a social post, however, rather than using words, you use emojis! `,
        },
        {
            title: "What is an Insight?",
            content:
                "An Insight is the answer to an Emortion, or the guess of an Emortion.",
        },
        {
            title: "How are scores for an Emortion calculated?",
            content: "The scores are calculated with multiple factors as follows:\n\n" +
                "Length of Emortion (10*words correct upto 60): For each word accurate you get 10 points\n\n"+
                "Rank of Insight (-2 for everyone answered upto -10): The first person gets 10 extra points." +
                " Each subsequent person loses 2 points upto 10 points\n\n"+
                "Time to Answer (-5 for every 10 seconds used to answer upto -30): If you answer fast, you get more points. " +
                "For every 10 seconds you use, you lose 10 points upto 30 points.\n\n"+
                "Maximum points on an emortion: 40 + words*10 . i.e 6 word emortion can earn you a maximum of 100 points.",
        },
        {
            title: "How do I play with friends?",
            content: `Click on the friendships tab, and search for your friends usernames. Add them as your friends and 
            you will see their rank Emortions on your feed and put yours on theirs.`,
        },
        {
            title: "What is the leaderboard?",
            content: "The leaderboard shows a list of players who have the highest scores on the platform!",
        },
        {
            title: "How do I get more points?",
            content: "Keep answering Emortions, but remember you have to be accurate!",
        },
        {
            title: "How do I send feedback or report something?",
            content: "Click the feedback icon on the navbar after you login and you will be able write us any feedback that you " +
                "want us to consider in the future. We appreciate all the feedbacks that can lead to our improvements.",
        },
        {
            title: "What is next for Emote-It",
            content: "In the future the developers intend to add a some new small features as time permits to the application to make it more interesting. Some of them are:\n\n" +
                "- Build a reverse of the current game, where the post is a sentence and friends try to guess the emojis.\n\n" +
                "- Build A React Native android and ios phone app.\n\n" +
                "- Build an special chat where users chat in limited words and more emojis in the future using Socket IO",
        }
    ],
};

export default function Info() {

    return (

        <div className="container -fluid">
            <div className={"row"}>
                <div className={"col-12 col-md-7"}>
                    <h1 className={"font-weight-bold"}>About</h1>
                    <p className={"font-weight-bold"}>Emote-It is a social platform where users get to challenge each other
                        with fun emoji based charades.
                        These challenges are called Emortions! Emortions can be answered by your friends or anyone else.
                        Players then collect points based on the accuracy of their answer. These answers are called
                        Insights!
                        These points and other stats add to the cumulative of a players lifetime score. Earn enough points
                        and
                        get featured in the world wide leaderboard! Dont forget to add others as your friends so you get notifications
                        about their acitivity and see their rank on your feed.
                        <br/>
                        <br/>
                        Emote-It is a self developped hobby project by a few enthusiastic developers learning MERN web app development.
                    </p>

                    <h1 className={"font-weight-bold"}>Credits</h1>
                    <ul className={"font-weight-bold"}>
                        <li>Soham Kale (Project Owner) &nbsp; [sohamkale2412@gmail.com]</li>
                        <li>Mohammad Asfaq Immam (Principle Developer) &nbsp; [immammohammad1@gmail.com]</li>
                        <li>Esfar Mohammad (Software Developer) &nbsp; [immam.m@ufl.edu]</li>
                        <li>Ashiq Islam (Front End Developement and Documentation) &nbsp; [ashiqulislam234@gmail.com]</li>
                    </ul>
                </div>
                <div className={"col"}>
                    <div className="accordion" id="accordionExample">
                        {data.rows.map((item, index) =>

                            <Collapse title={item.title} content={item.content} index={index}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


function Collapse(props) {
    return (

        <div className="card">
            <div className="card-header" id={`heading${props.index}`}>
                <h5 className="mb-0">
                    <button className="btn btn-link collapsed text-left text-dark" type="button" data-toggle="collapse"
                            data-target={`#collapse${props.index}`} aria-expanded="false" aria-controls={`collapse${props.index}`}>
                        {props.title}
                    </button>
                </h5>
            </div>
            <div id={`collapse${props.index}`} className="collapse" aria-labelledby={`heading${props.index}`} data-parent="#accordionExample">
                <div className="card-body " style={{whiteSpace:"pre-line"}}>
                    {props.content}
                </div>
            </div>
        </div>

    )
}