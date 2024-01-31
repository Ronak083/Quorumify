# Quorumify(Forum-API) Server :  

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