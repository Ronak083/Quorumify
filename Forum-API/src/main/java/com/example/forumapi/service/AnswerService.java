package com.example.forumapi.service;

import com.example.forumapi.entity.Answer;
import com.example.forumapi.entity.Question;
import com.example.forumapi.entity.Reply;

import java.util.List;

public interface AnswerService {

    Answer uploadAns(Answer answer, long id, long userID);

    String deleteAnswer(long aid, long userID);

    Answer updateAnswer(Answer answer, long l, long userID);

}