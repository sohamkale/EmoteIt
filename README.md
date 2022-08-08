# EmoteIt

## Project Type

Emote-It is a self developped hobby project by a few enthusiastic developers learning MERN web app development.

### Stack

- M (Mongo) hosted on Atlas
- E (Express) as the Server Framework
- R (React) for modern responsive front end
- N (NodeJS) for backend

## Hosting

- URL: https://emoteit-96e60.web.app/
---

### Firebase
- Front End: Hosting Package
- Backend: Cloud Function
- Identity Authentication through Google

### Atlas
- Mongo Database


## About

Emote-It is a social platform where users get to challenge each other with fun emoji based charades. These challenges
are called Emortions! Emortions can be answered by your friends or anyone else. Players then collect points based on the
accuracy of their answer. These answers are called Insights! These points and other stats add to the cumulative of a
players lifetime score. Earn enough points and get featured in the world wide leaderboard! Dont forget to add others as
your friends so you get notifications about their acitivity and see their rank on your feed.

## Instructions
- **local debugging**: install firebase-tools and use command: _firebase serve --only "functions,hosting"_
---
- client: contains all react js files used to build.
    - All assets are included in the assets folder.
    - Each route/page files can be found under the views folder.
    - All components are located in the component folder of the respective view folder. Note: some components are
      shared accross views and may be in the shared folder.
- server: contains the project files to run the node js server.
- config files
  - **server** & **client/src**: These folders require a config.js file with mainly firebase configurations. See config.example.js file and fill in your 
  configurations to run this project fresh from github.

## Project Resources

### Authentication
- uses firebase authentication.
- google API key through Google Cloud Platform and integrated through the Firebase interface.

### Database
- uses MongoDB hosted on Atlas

### Important Libraries

- nodeJS
- ReactJS
- Firebase

#### Front End

- EmojiMart
- React Cookie
- Axios

#### Backend

- Nodemon
- Mongoose
- Express
- Body Parser & Cookie Parser

#### Development

- Concurrently

## Other Resources
Secrets: One Drive: /Projects/EmoteIt

## Trello
- https://trello.com/b/oWpTxGo4/emoteit-front-end
- https://trello.com/b/Fjo0LtRA/emoteit-backend


## Contributors
- Soham Kale (Project Owner)   [sohamkale2412@gmail.com]
- Mohammad Asfaq Immam (Principle Developer)   [immammohammad1@gmail.com]
- Esfar Mohammad (Software Developer)   [immam.m@ufl.edu]
- Ashiq Islam (Front End Developement and Documentation)   [ashiqulislam234@gmail.com]


Last Development: 8/7/2022
Last Updated: 8/7/2022