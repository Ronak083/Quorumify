import { Button } from 'react-bootstrap';
import '../App.css';
import del from '../del.jpg'
import upload from'../upload.png'
import pencil from '../pencil.png';
import plus from '../plus.png';
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
            const response = await apiService.delete(`user/deleteQuestion/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting Question: ", error);
        }
    }

    const deleteAbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteAnswer/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting Answer: ", error);
        }
    }

    const deleteRbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteReply/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting reply: ", error);
        }
    }

    const deleteQuestionByMod = async (id) => {
        try {
            const response = await apiService.delete(`moderator/deleteQue/${id}`);
            console.log(response);
            getdata();
        } catch (error) {
            console.error("Error deleting question: ", error);
        }
    };

    const updateQuestionByMod = async (questionID) => {
        try {
            const response = await apiService.put(`moderator/updateQue/${questionID}`, cont);
            console.log(response);
            setContent(' ');
            getdata();
        } catch (error) {
            console.error("Error adding answer: ", error);
        }

    };

    return (
        <div className="home-container">

            {is_login ? (
                <>
                    {is_user === "USER" ? (
                        <div className="input-wrapper">
                            <input
                                className="form-control new-question-input"
                                onChange={(e) => setContent({ content: e.target.value })}
                                type="text"
                                placeholder="Add new Question"
                            />

                            <button className='add-question-btn' onClick={() => addQue()} ><img className="uploadbtn" src={upload} alt="upload-btn" /></button>
                            <hr />
                        </div>
                    ) : "" }

                </>
            ) : <h4 >Basic User view</h4>
            }
            {data.map((question) => (
                <div key={question.id} className="question-container">
                    <hr />
                    <h6>
                    <span className="highlighted-text">{question.content}</span> <span  className="user-detail">- Posted by <b>{question.user.email}</b> on {question.date} </span>
                        {
                            is_username === question.user.email ?
                                <button className="delete-btn" onClick={() => deleteQbyuser(question.id)}>
                                    <img className="delimg" src={del} alt="delete-btn" />
                                </button>
                                : ""
                        } </h6>
                    
                    {question.answer.length > 0 ?
                        (
                            <ul>
                                {question.answer.map((answer) =>
                                (
                                    <li key={answer.id} className="answer-item">
                                        <p>{answer.content}
                                            <span  className="user-detail"> - Posted by <b>{answer.user.email}</b> on {answer.date}</span>{
                                                is_username === answer.user.email ?
                                                    <button className="delete-btn" onClick={() => deleteAbyuser(answer.id)}>
                                                        <img className="delimg" src={del} alt="delete-btn" />
                                                    </button>
                                                    : ""
                                            } 
                                            {answer.replies.length > 0 ? (
                                                <ul>
                                                    {
                                                        answer.replies.map((reply) =>
                                                        (
                                                            <li key={reply.id} className="reply-item">{reply.content}, <span  className="user-detail"> {reply.user.email} </span> {
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
                                                <div className="input-wrapper">
                                                    <input 
                                                        className="reply-input form-control"
                                                        type="text"
                                                        placeholder="Add Comment to the Answer"
                                                        onChange={(e) => setContent({ content: e.target.value, })}
                                                    />
                                                    <button className= "upload-btn" onClick={() => addRep(answer.id)}><img className="upload-btn-img" src={plus} alt="upload-btn" /></button>
                                                </div>
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
                                <div className="input-wrapper">
                                    <input
                                        className="form-control answer-input"
                                        onChange={(e) => setContent({ content: e.target.value })}
                                        type="text"
                                        placeholder="your response"
                                    />
                                    <button className="upload-btn" onClick={() => addAns(question.id)}><img className="upload-btn-img" src={pencil} alt="upload-btn" /></button> <br /><hr />
                                </div>
                            ) : ""}
                            {is_user === "MODERATOR" ? (
                                <div className="input-wrapper">
                                    <input
                                        className="form-control update-question-input"
                                        onChange={(e) => setContent({ content: e.target.value })}
                                        type="text"
                                        placeholder="Update Question"
                                    />
                                    <button onClick={() => updateQuestionByMod(question.id)} className="upload-btn" ><img className="upload-btn-img" src={pencil} alt="upload-btn" /></button>
                                    <button onClick={() => deleteQuestionByMod(question.id)} className="upload-btn" ><img className="upload-btn-img" src={del} alt="upload-btn" /></button>
                                </div>
                            ) : ""}
                            
                        </>
                    ) : ""}

                </div>
            ))}
        </div>

    );
};
export default Home