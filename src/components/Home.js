import { Button } from 'react-bootstrap';
import '../App.css';
import del from '../del.png'
import apiService from '../services/apiServices';
import React, { useState, useEffect } from 'react';
import apiServicelogin from '../services/apiSerivcesLogin';

const Home = () => {
    const [data, setData] = useState([]);

    const [cont, setContent] = useState({
        content: '',
    });


    const is_login = localStorage.getItem('token');
    const is_user = localStorage.getItem('role');
    const is_username = localStorage.getItem('username');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiServicelogin.get('auth/');
                setData(response.data);

            } catch (error) {
                console.error("error Fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const getdata = async () => {
        try {
            const response = await apiServicelogin.get('auth/');
            setData(response.data);

        } catch (error) {
            console.error("error Fetching data: ", error);
        }
    }

    const addRep = async (id) => {
        try {
            const response = await apiService.post(`user/postReply/${id}`, cont);
            console.log(response);
            setContent(' ');
            getdata();

        } catch (error) {
            console.error("Error adding reply: ", error);
        }

    };

    const addAns = async (id) => {

        try {
            const response = await apiService.post(`user/postAnswer/${id}`, cont);  
            console.log(response);          
            setContent(' ');
            getdata();
        } catch (error) {
            console.error("Error adding answer: ", error);
        }

    };

    const updateQ = async (questionID) => {
        try {
            const response = await apiService.put(`moderator/updateQue/${questionID}`, cont);
            console.log(response);
            setContent(' ');
            getdata();
        } catch (error) {
            console.error("Error adding answer: ", error);
        }

    };

    const addQue = async () => {

        try {
            const response = await apiService.post('user/postQuestion', cont);
            console.log(response);
            setContent(' ');
            getdata();;
        } catch (error) {
            console.error("Error Posting Question: ", error);
        }


    };

    const deleteQbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteQuestionByUser/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting Question: ", error);
        }
    }

    const deleteAbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteAnswerByUser/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting Answer: ", error);
        }
    }

    const deleteRbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteReplyByUser/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting reply: ", error);
        }
    }

    const deleteQuestion = async (id) => {
        try {
            const response = await apiService.delete(`admin/deleteQue/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting question: ", error);
        }
    };

    return (
        <div className="home-container">

            {is_login ? (
                <>
                    {is_user === "USER" ? (
                        <>
                            <input
                                className="form-control new-question-input"
                                onChange={(e) => setContent({ content: e.target.value })}
                                type="text"
                                placeholder="Add new Question"
                            />

                            <button className='add-question-btn' onClick={() => addQue()} >Add</button>
                            <hr />
                        </>
                    ) : ""}

                </>
            ) : <h4 >Basic User view</h4>
            }
            {data.map((question) => (
                <div key={question.id} className="question-container">
                    <hr />
                    <h4>{question.content} </h4>
                    <h6> - Posted by {question.user.email} on {question.date}
                        {
                            is_username === question.user.email ?
                                <button className="delete-btn" onClick={() => deleteQbyuser(question.id)}>
                                    <img className="delimg" src={del} alt="delete-btn" />
                                </button>
                                : ""
                        }
                    </h6>
                    {question.answer.length > 0 ?
                        (
                            <ul>
                                {question.answer.map((answer) =>
                                (
                                    <li key={answer.id} className="answer-item">
                                        <p>{answer.content}
                                            <> - <i><u>Posted by <b>{answer.user.email}</b> on: {answer.date}</u></i>{
                                                is_username === answer.user.email ?
                                                    <button className="delete-btn" onClick={() => deleteAbyuser(answer.id)}>
                                                        <img className="delimg" src={del} alt="delete-btn" />
                                                    </button>
                                                    : ""
                                            } </>
                                            {answer.replies.length > 0 ? (
                                                <ul>
                                                    {
                                                        answer.replies.map((reply) =>
                                                        (
                                                            <li key={reply.id} className="reply-item">{reply.content}, {reply.user.email} {
                                                                is_username === reply.user.email ?
                                                                    <button className="delete-btn" onClick={() => deleteRbyuser(reply.id)}>
                                                                        <img className="delimg" src={del} alt="delete-btn" />
                                                                    </button>
                                                                    : ""
                                                            }</li>
                                                        )
                                                        )
                                                    }
                                                </ul>
                                            ) : ""}
                                            {is_user === "USER" ? (
                                                <>
                                                    <input
                                                        className="reply-input form-control"
                                                        type="text"
                                                        placeholder="Add Comment to the Answer"
                                                        onChange={(e) => setContent({ content: e.target.value, })}
                                                    />
                                                    <Button onClick={() => addRep(answer.id)}>Add Comment</Button>
                                                </>
                                            ) : ""}
                                        </p>

                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Response Yet!!</p>
                        )}
                    {is_login ? (
                        <>
                            {is_user === "USER" ? (
                                <>
                                    <input
                                        className="form-control answer-input"
                                        onChange={(e) => setContent({ content: e.target.value })}
                                        type="text"
                                        placeholder="your response"
                                    />
                                    <Button onClick={() => addAns(question.id)}>Add Response</Button> <br /><hr />
                                </>
                            ) : ""}
                            {is_user === "MODERATOR" ? (
                                <>
                                    <input
                                        className="form-control update-question-input"
                                        onChange={(e) => setContent({ content: e.target.value })}
                                        type="text"
                                        placeholder="Update Question"
                                    />
                                    <Button onClick={() => updateQ(question.id)}>Update</Button>
                                </>
                            ) : ""}
                            {is_user === "ADMIN" ? (
                                <>
                                    <Button onClick={() => deleteQuestion(question.id)} className='btn btn-dark delete-btn' >Delete</Button>
                                </>
                            ) : ""}
                        </>
                    ) : ""}

                </div>
            ))}
        </div>

    );
};
export default Home