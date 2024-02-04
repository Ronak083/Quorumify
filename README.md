# Quorumify:  Java, React JS, Spring Boot, Security, JPA, MySQL
• Developed a 'Forum Portal' project akin to Quora, prioritizing security, featuring authentication, and role-based access levels (Admin, Moderator, Basic User), ensuring a controlled and secure user experience.<br>
• Designed a seamless interface with distinct views for users at different authentication levels, offering a personalized experience based on roles, including a dedicated view for non-logged-in users.<br>
• Empowered users with comprehensive CRUD functionalities for questions, answers, and comments. Implemented user-specific permissions, allowing users to modify and delete their contributions.<br>

### File Content:
- Database Structure
- Role-Based Access Level
- Getting Started with Server
- Getting Started with React App
- Screenshots of Quorumify
- API Testing ScreenShots
- Conclusion 

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

<td> <img src="Forum-API/Screenshots/DB%20table.png" alt="-" />
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

## Getting Started with Server 
```c
> Download the Zip file of Quarumify-Server"
> Clean and Install Maven before running the Application.
> Run src/main/java/com/example/forumapi/ForumApiApplication.java as Application.
> Run on Default port [localhost:8080], So that it will run without any problem because the React app is configured with localhost:8080 only.
```
For any Query Contact me at ronakgupta083@gmail.com

## Getting Started with React App (User Interface)

### `npm start`

> Runs the app in the development mode.\
> Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
> See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


You may also see any lint errors in the console.

## Quorumify ScreenShots
<p>
Here are some Screenshots from Quorumify User-Interface Testing
> Basic User View(Home Page): For Unauthenticated User. For Basic User, Header Shows Signup/Login Button.
  <img src="src/Screenshots/Screenshot%202024-02-03%20015304.png" width ="90%">

> Signup Page: Take inputs from user, Store in DB and Redirect to Login page.
<img src="src/Screenshots/Screenshot%202024-02-03%20005406.png" width ="90%">

> Log in page: Response content JWT token which Stores in Local Storage & Redirect to Role Based page
  <img src="src/Screenshots/Screenshot%202024-02-03%20005441.png" width ="90%">

> Home Page for normal user. User can add new Question/ Answer/ Reply and Delete his contribution, Just see small
> delete button in last 2nd line because current user is testing@gmai.com
<img src="src/Screenshots/Screenshot%202024-02-03%20014643.png" width ="90%">

> Admin Panel: If User is Admin it will Redirect to admin Panel just after login. Camn modify User Role in just one Click.
<img src="src/Screenshots/Screenshot%202024-02-03%20010250.png" width ="90%">

> Moderator View: If User is Moderator it will Redirect to Home page with Update/ Delete functionality.
<img src="src/Screenshots/Screenshot%202024-02-03%20010338.png" width ="90%">

> User Panel: Can see Login user info and Change Bio
  <img src="src/Screenshots/Screenshot%202024-02-03%20010200.png" width ="90%">

> Logout Page: Clear Local Storage & Reload webpage.
<img src="src/Screenshots/Screenshot%202024-02-03%20005254.png" width ="90%">

</p>

## API Testing ScreenShots
<p>
Here are some Screenshots from Postman During API testing

 > GET: api/auth/ - Get all the Questions from Database
  <img src="Forum-API/Screenshots/Screenshot%202024-01-19%20133844.png" alt="-" width="90%"/>

> POST: api/auth/signin/ (email, password) - Provide JWT Token for Secure transaction 
  <img src="Forum-API/Screenshots/Screenshot%202024-01-19%20135029.png" alt="-" width="90%"/>

> GET: api/auth/loggedInUserinfo - Gives Current User Info from Request Header
  <img src="Forum-API/Screenshots/Screenshot%202024-01-19%20135610.png" alt="-" width="90%"/>

> POST: api/user/postQuestion (content) - Upload Question in database and Create a Blank List of Answers, & taking 
> User, Date, I'd by its own
  <img src="Forum-API/Screenshots/Screenshot%202024-01-19%20135858.png" alt="-" width="90%"/>

> POST: api/user/postAnswer/{Q_ID} (content) - Upload Answer in database and Create a Blank List of Reply, set 
> Question_ID = Q_ID & taking User, Date, I'd by its own
  <img src="Forum-API/Screenshots/Screenshot%202024-01-19%20140857.png" alt="-" width="90%"/>
  
> PUT: api/user/updateBio (bio)  Update User Bio
  <img src="Forum-API/Screenshots/Screenshot%202024-01-19%20141946.png" alt="-" width="90%"/>

> DELETE: api/user/delete/QuestionByUser - Each user has Access to Delete Question Posted by him.
  <img src="Forum-API/Screenshots/Screenshot%202024-01-19%20142401.png" alt="-" width="90%"/>
</p>

## Conclusion 
This project was created to showcase my Full-stack technical skills, here I have mainly focused on Secure Backend (Authentication and Authorization). Each Session is controlled by JWT Token which has an Expiry of 15 min. I have introduced Role-based access control (RBAC) by providing different Access levels to each User. In this project, I gained hands-on experience in different technologies, especially in React JS which was initially challenging for me to create a User-friendly Interface. 

I would like to thank all the friends who helped me to build this Web-Application. I refer to documentation from Spring.io and react.dev with some YouTube tutorials to build this project. Hope You Like my work, For a more detailed discussion or to share your valuable insights, feel free to reach out to me at ronakgupta083@gmail.com. 