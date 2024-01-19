package com.example.forumapi.service;

import com.example.forumapi.entity.Question;

import java.util.List;

public interface QuestionService {
    Question upload(Question question, long userID);
    List<Question> getQuestions();

    String deleteQuestion(long qid);

    Question updateQuestion(Question que, long questionID);

    String deleteQuestionbyUser(long qID, long userID);
}