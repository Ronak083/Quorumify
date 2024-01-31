package com.example.forumapi.service;

import com.example.forumapi.entity.Question;

import java.util.List;

public interface QuestionService {
    Question upload(Question question, long userID);
    List<Question> getQuestions();

    String deleteQuestionByMod(long qid);

    Question updateQuestionByMod(Question que, long questionID);

    String deleteQuestion(long qID, long userID);

    Question updateQuestion(Question que, long id, long userID);
}