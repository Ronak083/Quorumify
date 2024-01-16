import { Button } from 'react-bootstrap';
import '../App.css';
import apiService from '../services/apiServices';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [data, setData] = useState([]);

    const [que, setQue] = useState({
        question: '',
        date: '',
        username: '',
    });

    const [ans, setAns] = useState({
        answer: '',
        date: '',
        username: '',
    });

    const [rep, setRep] = useState({
        reply: '',
        date: '',
        username: '',
    });

    var today = new Date(),
        todaysdate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    const is_login = localStorage.getItem('token');
    const is_user = localStorage.getItem('role');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('auth/');
                setData(response.data);

            } catch (error) {
                console.error("error Fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const addRep = async (id) => {

        try {
            const response = await apiService.post(`user/replyToAns/${id}`, rep);
            setData(response.data);
            setRep(' ');
        } catch (error) {
            console.error("Error adding reply: ", error);
        }

    };

    const addAns = async (id) => {

        try {
            const response = await apiService.post(`user/postAnswer/${id}`, ans);
            setData(response.data);
            setAns(' ');
        } catch (error) {
            console.error("Error adding answer: ", error);
        }

    };

    const updateQ = async (questionID) => {
        try {

            const response = await apiService.put(`moderator/updateQue/${questionID}`, que);
            setData(response.data);
            setQue(' ');
        } catch (error) {
            console.error("Error adding answer: ", error);
        }

    };

    const addQue = async () => {

        try {
            const response = await apiService.post('user/postQuestion', que);
            setData(response.data);
            setAns(' ');
        } catch (error) {
            console.error("Error Posting Question: ", error);
        }


    };

    const deleteQuestion = async (id) => {
        try {
            const response = await apiService.delete(`admin/deleteQue/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error adding answer: ", error);
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
                                onChange={(e) => setQue({ ...que, question: e.target.value, date: todaysdate, username: localStorage.getItem('username') })}
                                type="text"
                                placeholder="Add new Question"
                            />

                            <button className='add-question-btn' onClick={() => addQue()} >Add</button>
                            <hr />
                        </>
                    ) : ""}

                </>
            ) : ""}
            {data.map((item) => (
                <div key={item.id} className="question-container">
                    <hr />
                    <h4>{item.question} </h4>
                    <h6> - Posted by {item.username} on {item.date}</h6>
                    {item.answer.length > 0 ?
                        (
                            <ul>
                                {item.answer.map((answer) =>
                                (
                                    <li key={answer.id} className="answer-item">
                                        <p>{answer.answer}
                                            <> - <i><u>Posted by <b>{answer.username}</b> on: {answer.date}</u></i></>
                                            {answer.replies.length > 0 ? (
                                                <ul>
                                                    {
                                                        answer.replies.map((reply) =>
                                                        (
                                                            <li key={reply.id} className="reply-item">{reply.reply}, {reply.username}</li>
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
                                                        placeholder="Add Reply to the Answer"
                                                        onChange={(e) => setRep({ ...que, reply: e.target.value, date: todaysdate, username: localStorage.getItem('username') })}
                                                    />
                                                    <Button onClick={() => addRep(answer.id)}>Add Reply</Button>
                                                </>
                                            ) : ""}
                                        </p>

                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Answer Yet!!</p>
                        )}
                    {is_login ? (
                        <>
                            {is_user === "USER" ? (
                                <>
                                    <input
                                        className="form-control answer-input"
                                        onChange={(e) => setAns({ ...ans, answer: e.target.value, date: todaysdate, username: localStorage.getItem('username') })}
                                        type="text"
                                        placeholder="Answer"
                                    />
                                    <Button onClick={() => addAns(item.id)}>Add Answer</Button> <br /><hr />
                                </>
                            ) : ""}
                            {is_user === "MODERATOR" ? (
                                <>
                                    <input
                                        className="form-control update-question-input"
                                        onChange={(e) => setQue({ ...que, question: e.target.value })}
                                        type="text"
                                        placeholder="Update Question"
                                    />
                                    <Button onClick={() => updateQ(item.id)}>Update</Button>
                                </>
                            ) : ""}
                            {is_user === "ADMIN" ? (
                                <>
                                    <Button onClick={() => deleteQuestion(item.id)} className='btn btn-dark delete-btn' >Delete</Button>
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