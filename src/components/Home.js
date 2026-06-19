import '../App.css';
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
                console.log("Data fetched Successfully");

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
            console.log(response.data);
            setContent(' ');
            getdata();

        } catch (error) {
            console.error("Error adding reply: ", error);
        }

    };

    const addAns = async (id) => {

        try {
            const response = await apiService.post(`user/postAnswer/${id}`, cont);
            console.log(response.data);
            setContent(' ');
            getdata();
        } catch (error) {
            console.error("Error adding answer: ", error);
        }

    };

    const addQue = async () => {

        try {
            const response = await apiService.post('user/postQuestion', cont);
            console.log(response.data);
            setContent(' ');
            getdata();;
        } catch (error) {
            console.error("Error Posting Question: ", error);
        }


    };

    const deleteQbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteQuestion/${id}`);
            console.log(response.data);
            getdata();
        } catch (error) {
            console.error("Error deleting Question: ", error);
        }
    }

    const deleteAbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteAnswer/${id}`);
            console.log(response.data);
            getdata();
        } catch (error) {
            console.error("Error deleting Answer: ", error);
        }
    }

    const deleteRbyuser = async (id) => {
        try {
            const response = await apiService.delete(`user/deleteReply/${id}`);
            console.log(response.data);
            getdata();
        } catch (error) {
            console.error("Error deleting reply: ", error);
        }
    }

    const deleteQuestionByMod = async (id) => {
        try {
            const response = await apiService.delete(`moderator/deleteQue/${id}`);
            console.log(response.data);
            getdata();
        } catch (error) {
            console.error("Error deleting question: ", error);
        }
    };

    const updateQuestionByMod = async (questionID) => {
        try {
            const response = await apiService.put(`moderator/updateQue/${questionID}`, cont);
            console.log(response.data);
            setContent(' ');
            getdata();
        } catch (error) {
            console.error("Error adding answer: ", error);
        }

    };

    return (
        <div className="page-container">
            <h4 className="section-title">
                <i className="bi bi-chat-square-text" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
                Discussion Forum
            </h4>

            {is_login && is_user === "USER" && (
                <div className="ask-section">
                    <h5><i className="bi bi-plus-circle" style={{ marginRight: '0.4rem' }}></i>Ask a Question</h5>
                    <div className="input-group-custom">
                        <input
                            onChange={(e) => setContent({ content: e.target.value })}
                            type="text"
                            placeholder="What's on your mind?"
                        />
                        <button className="btn-primary-custom" onClick={() => addQue()}>
                            <i className="bi bi-send"></i> Post
                        </button>
                    </div>
                </div>
            )}

            {!is_login && (
                <div className="auth-alert" style={{ marginBottom: '1.5rem' }}>
                    <i className="bi bi-info-circle" style={{ marginRight: '0.4rem' }}></i>
                    You're browsing as a guest. Log in to ask questions and participate.
                </div>
            )}

            {data.length === 0 ? (
                <div className="empty-state">
                    <i className="bi bi-chat-square-dots"></i>
                    <p>No questions yet. Be the first to ask!</p>
                </div>
            ) : (
                data.map((question) => (
                    <div key={question.id} className="question-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div className="question-content">{question.content}</div>
                                <div className="post-meta">
                                    <i className="bi bi-person"></i> <b>{question.user.email}</b> &middot; {question.date}
                                </div>
                            </div>
                            {is_username === question.user.email && (
                                <button className="btn-danger-custom" onClick={() => deleteQbyuser(question.id)} title="Delete question">
                                    <i className="bi bi-trash"></i>
                                </button>
                            )}
                        </div>

                        {question.answer.length > 0 ? (
                            <>
                                <div className="answers-header">
                                    <i className="bi bi-chat-left-text"></i> {question.answer.length} {question.answer.length === 1 ? 'Answer' : 'Answers'}
                                </div>
                                {question.answer.map((answer) => (
                                    <div key={answer.id} className="answer-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div className="answer-content">{answer.content}</div>
                                                <div className="post-meta">
                                                    <i className="bi bi-person"></i> <b>{answer.user.email}</b> &middot; {answer.date}
                                                </div>
                                            </div>
                                            {is_username === answer.user.email && (
                                                <button className="btn-danger-custom" onClick={() => deleteAbyuser(answer.id)} title="Delete answer">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            )}
                                        </div>

                                        {answer.replies.length > 0 && (
                                            <div style={{ marginTop: '0.5rem' }}>
                                                {answer.replies.map((reply) => (
                                                    <div key={reply.id} className="reply-card">
                                                        <span>{reply.content}</span>
                                                        <span className="post-meta" style={{ marginLeft: '0.5rem' }}>
                                                            &mdash; <b>{reply.user.email}</b>
                                                        </span>
                                                        {is_username === reply.user.email && (
                                                            <button className="btn-danger-custom" onClick={() => deleteRbyuser(reply.id)} title="Delete reply">
                                                                <i className="bi bi-trash" style={{ fontSize: '0.75rem' }}></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {is_user === "USER" && (
                                            <div className="input-group-custom" style={{ marginTop: '0.5rem' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Write a reply..."
                                                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem' }}
                                                    onChange={(e) => setContent({ content: e.target.value })}
                                                />
                                                <button className="btn-ghost" onClick={() => addRep(answer.id)}>
                                                    <i className="bi bi-reply"></i> Reply
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="no-answers">No responses yet</p>
                        )}

                        {is_login && is_user === "USER" && (
                            <div className="input-group-custom" style={{ marginTop: '0.75rem' }}>
                                <input
                                    onChange={(e) => setContent({ content: e.target.value })}
                                    type="text"
                                    placeholder="Write an answer..."
                                />
                                <button className="btn-primary-custom" onClick={() => addAns(question.id)}>
                                    <i className="bi bi-pencil"></i> Answer
                                </button>
                            </div>
                        )}

                        {is_login && is_user === "MODERATOR" && (
                            <div className="input-group-custom" style={{ marginTop: '0.75rem' }}>
                                <input
                                    onChange={(e) => setContent({ content: e.target.value })}
                                    type="text"
                                    placeholder="Update this question..."
                                />
                                <button className="btn-primary-custom" onClick={() => updateQuestionByMod(question.id)}>
                                    <i className="bi bi-pencil-square"></i> Update
                                </button>
                                <button className="btn-danger-solid" onClick={() => deleteQuestionByMod(question.id)}>
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
export default Home
