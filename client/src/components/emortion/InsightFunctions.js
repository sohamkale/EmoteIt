
//front end will ask the backend, that i am user id: "201220", give me the emortions I am supposed to see.
//backend will return you emortions.

var appUser = {
    id: "201220"
}

export const emortions = [ {
    id:"22993",
    message: "Hello Jeem",
    expiresAt: "12-20-2021",
    emojis: ["😀", "😄 ", "🥰", "😍"],
    userId: "4388829",

    userInsight: {
        //
        emortionId:"22993",
        userId: "201220",
        //

        response: "The quick yellow cat leapedsdsd",
        score: 200,
        reactionIds: [""],
        startedAt: new Date("12/03/2021 11:25:03"),
        device: "desktop"
    },
    insights: [
        {
            //
            emortionId:"22993",
            userId: "201220",
            //

            response: "The quick brown cat years",
            score: 430,
            reactionIds: ["2334","2332"],
            startedAt: new Date("10/20/2021"),
            device: "phone"
        },
        {
            //
            emortionId:"2299332",
            userId: "201220",
            //

            response: "Hi Jeems",
            score: 120,
            reactionIds: ["2334","2332"],
            startedAt: new Date("10/20/2021"),
            device: "desktop"
        }
    ], //[]

    reactionIds: ["2334","2332"]
}
];

/*export const emortions = [ {
    id:"22993",
    message: "The quick brown fox jumped",
    expiresAt: "12-20-2021",
    emojis: ["😀", "😄 ", "🥰", "😍"],
    userId: "4388829",
    insightUserIds: ["201220", "515668", "766432", "234478"],
    reactionIds: ["2334","2332"]
},

    {
        id:"22996",
        message: "The quick brown fox jumped",
        expiresAt: "12-20-2021",
        emojis: ["😀", "😄 ", "🥰", "😍"],
        userId: "4388829",
        insightUserIds: ["201220", "515668", "766432", "234478"],
        reactionIds: ["2334","2332"]
    }
    ];*/



// select * from insight where emortionId = "22993" and insightId = "201220"

export const insight = {
    //
        emortionId:"22993",
        userId: "201220",
    //

    response: "The quick brown cat years",
    score: 200,
    reactionIds: ["2334","2332"],
    startedAt: new Date("10/20/2021")
}

const insight2 = {
    emortionId:"22993",
    userId: "201220",
    //

    response: "The quick brown cat years",
    score: 200,
    reactionIds: ["2334","2332"],
    startedAt: new Date("10/20/2021")
}




