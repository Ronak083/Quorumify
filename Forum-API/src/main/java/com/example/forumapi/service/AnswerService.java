package com.example.forumapi.service;

import com.example.forumapi.entity.Answer;
import com.example.forumapi.entity.Question;
import com.example.forumapi.entity.Reply;

import java.util.List;

public interface AnswerService {

    Answer uploadAns(Answer answer, long id, long userID);
    Reply uploadRep(Reply reply, long id, long userID);

    String deleteAnswerbyUser(long aid, long userID);
    String deleteReplybyUser(long rid, long userID);
}