# Quorumify:  Java, React JS, Spring Boot, Security, JPA, MySQL

•Developed a Forum Portal project akin to Quora, with 4 role-based access levels (Admin, Moderator, Basic User & unauthenticated User), ensuring a controlled and secure user experience. <br>
•Designed a seamless interface with distinct views for users at 4 different authentication levels, offering a personalized experience based on roles, including a dedicated view for non-logged-in users. <br>
•Allowed users with comprehensive CRUD functionalities on 3 different Objects i.e. questions, answers, & comments. Implemented user-specific permissions, allowing users to modify & delete their contributions. <br>

## Database Structure
<table>

 <tr>    
    <td>

```c 
> Question: ID, Content, Date, User{UserId-foreign Key}, List of Answer.
    {List of AnswerId's - List of foreign Key} 
     -> Many to One Table (QuestionID, AnswerID)
     
> Answer: ID, Content, Date, User{UserId-foreign Key}, List of Reply.
    {List of ReplyID's - List of foreign Key} 
        -> Many to One Table (AnswerID, ReplyID)
        
> Replies: ID, Content, Date, User{UserId-foreign Key}. 

> User: FirstName, LastName, Email, Password, Role, Bio. 
```

</td>

<td> <img src="Screenshots/DB%20table.png" alt="-" />
</td>
 </tr>
</table>

## Role Based Access Level 

```c

> Public:- api/auth  - /, /signin, /signup 

> Admin:- api/ADMIN -  /updateUserToModerator, /updateModeratorToUser, /GetAllUser 

> User:- api/USER - /UpdateBio, /postQuestion, /postAnswer, /postReply, /deleteQuestion, /deleteAnswer, /deleteReply

> Moderator:- api/MODERATOR - /updateQuestionByMod, /deleteQuestionByMod
 ```

# Getting Started with Server 
```c
> Download the Zip file of Quarumify-Server"
> Clean and Install Maven before running the Application.
> Run src/main/java/com/example/forumapi/ForumApiApplication.java as Application.
> Run on Default port [localhost:8080], So that it will run without any problem because the React app is configured with localhost:8080 only.
```
For any Query Contact me at ronakgupta083@gmail.com

## ScreenShots

<p>
Here are some Screenshots from Postman During Api testing

 > GET: api/auth/ - Get all the Questions from Database
  <img src="Screenshots/Screenshot%202024-01-19%20133844.png" alt="-" width="90%"/>

> POST: api/auth/signin/ (email, password) - Provide JWT Token for Secure transaction 
  <img src="Screenshots/Screenshot%202024-01-19%20135029.png" alt="-" width="90%"/>

> GET: api/auth/loggedInUserinfo - Gives Current User Info from Request Header
  <img src="Screenshots/Screenshot%202024-01-19%20135610.png" alt="-" width="90%"/>

> POST: api/user/postQuestion (content) - Upload Question in database and Create a Blank List of Answers, & taking 
> User, Date, I'd by its own
  <img src="Screenshots/Screenshot%202024-01-19%20135858.png" alt="FoodRunner Splash Screen" width="90%"/>

> POST: api/user/postAnswer/{Q_ID} (content) - Upload Answer in database and Create a Blank List of Reply, set 
> Question_ID = Q_ID & taking User, Date, I'd by its own
  <img src="Screenshots/Screenshot%202024-01-19%20140857.png" alt="FoodRunner Splash Screen" width="90%"/>
  
> PUT: api/user/updateBio (bio)  Update User Bio
  <img src="Screenshots/Screenshot%202024-01-19%20141946.png" alt="FoodRunner Splash Screen" width="90%"/>

> DELETE: api/user/delete/QuestionByUser - Each user has Access to Delete Question Posted by him.
  <img src="Screenshots/Screenshot%202024-01-19%20142401.png" alt="FoodRunner Splash Screen" width="90%"/>
</p>


# Getting Started with React App (User Interface)

### `npm start`
> Runs the app in the development mode.\
> Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
> See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

You may also see any lint errors in the console.
