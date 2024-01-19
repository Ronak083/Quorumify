package com.example.forumapi.service.impl;

import com.example.forumapi.config.ResourceNotExisted;
import com.example.forumapi.entity.Answer;
import com.example.forumapi.entity.Question;
import com.example.forumapi.repository.AnswerRepository;
import com.example.forumapi.repository.QuestionRepository;
import com.example.forumapi.repository.UserRepository;
import com.example.forumapi.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
@RequiredArgsConstructor
public class QuestionImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final AnswerRepository answerRepository;
    List<Answer> answersList;

    @Override
    public Question upload(Question question, long userID) {

        Question que = new Question();
        answersList = new ArrayList<>();
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
        String dateFormat = formatter.format(date);

        que.setContent(question.getContent());
        que.setUser(userRepository.findById(userID).orElseThrow(
                () -> new ResourceNotExisted("Answer Not exist","Id", userID)));
        que.setDate(dateFormat);
        que.setAnswer(answersList);

        questionRepository.save(que);
        return que;
    }

    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }
    @Override
    public Question updateQuestion(Question que, long id) {
        Question question = questionRepository.findById(id).orElseThrow(
                () -> new ResourceNotExisted("Question Not exist",
                        "Id", id));
        question.setContent(que.getContent());
        questionRepository.save(question);

        return question;
    }

    @Override
    public String deleteQuestion(long qid) {
        try {
            questionRepository.deleteById(qid);
        } catch (Exception e) {
            throw e;
        }
        return "Question Deleted Successfully by Admin";
    }
    @Override
    public String deleteQuestionbyUser(long id, long userID) {
        Question q = questionRepository.findById(id).orElseThrow(
                () -> new ResourceNotExisted("Question Not exist",
                        "Id", id));
        if(q.getUser().getId() == userID) {
            questionRepository.deleteById(id);
            return "Question Deleted Successfully";
        }
        return "User has not access to delete this question";
    }


}