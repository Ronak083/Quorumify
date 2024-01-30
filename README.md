# Quorumify(Forum-API) Server :  

## Database Structure

> Question: ID, Content, Date, User{UserId-foreign Key}, List of Answer{List of AnswerId's - List of foreign Key}. <br>
&emsp; Many to One Table (QuestionID, AnswerID)

> Answer: ID, Content, Date, User{UserId-foreign Key}, List of Reply{List of ReplyID's - List of foreign Key}. <br>
&emsp; Many to One Table (AnswerID, ReplyID)

> Replies: ID, Content, Date, User{UserId-foreign Key}. <br>

> User: FirstName, LastName, Email, Password, Role, Bio. <br>

## Role Based Accses Level 
> &emsp; Public:- api/auth  - /, /signin, /signup <br>

> &emsp; Admin:- api/ADMIN - /DeleteQuestion, /updateUserToModerator, /updateModeratorToUser, /GetAllUser <br>

> &emsp; User:- api/USER - /postQuestion, /postAnswer, /postReply, /deleteQuestionByUser, /deleteAnswerByUser, /deleteReplyByUser, /UpdateBio<br>

> &emsp; Moderator:- api/MODERATOR - /UpdateQuestion <be>

# Getting Started with Server 
> Download the Zip file of [Quarumify-Server](https://github.com/Ronak083/Forum-API)
> Clean and Install Maven before running the Application.
> Run src/main/java/com/example/forumapi/ForumApiApplication.java as Application.
> Run on Default port [localhost:8080](), So that it will run without any problem because React app is configured with localhost:8080 only.

# Getting Started with React App (User Interface)

### `npm start`
> Runs the app in the development mode.\
> Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
> See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

You may also see any lint errors in the console.
