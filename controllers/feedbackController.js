export function GetFeedbacks(complete){
    //goes to mongo and collects all incomplete feedback and returns the array of feedback.

    //fake feedback array:
    const completeFeedbacks = [{
        id: "20331",
        createdAt:"10-10-2020T6:15PM",
        createdBy:"10-10-2020T7:15PM",
        objectTypeId: 2,
        typeId: 3,
        subjectId: "1233230",
        message: "Your application is very beautiful",
        statusId: 0
    },
        {
            id: "20331",
            createdAt:"10-10-2020T6:15PM",
            createdBy:"10-10-2020T7:15PM",
            objectTypeId: 2,
            typeId: 3,
            subjectId: "1233230",
            message: "Your application is very beautiful",
            statusId: 0
        },
        {
            id: "20331",
            createdAt:"10-10-2020T6:15PM",
            createdBy:"10-10-2020T7:15PM",
            objectTypeId: 2,
            typeId: 3,
            subjectId: "1233230",
            message: "Your application is very beautiful",
            statusId: 0
        }
        ]

    const incompleteFeedbacks = [{
        id: "20331",
        createdAt:"10-10-2020T6:15PM",
        createdBy:"10-10-2020T7:15PM",
        objectTypeId: 2,
        typeId: 3,
        subjectId: "1233230",
        message: "Your application is very ugly",
        statusId: 0
    },
        {
            id: "20331",
            createdAt:"10-10-2020T6:15PM",
            createdBy:"10-10-2020T7:15PM",
            objectTypeId: 2,
            typeId: 3,
            subjectId: "1233230",
            message: "Your application is very beautiful",
            statusId: 0
        }
    ]

    return complete?completeFeedbacks:incompleteFeedbacks
}
