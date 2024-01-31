package com.example.forumapi.service.impl;

import com.example.forumapi.config.ResourceNotExisted;
import com.example.forumapi.entity.Answer;
import com.example.forumapi.entity.Question;
import com.example.forumapi.entity.Reply;
import com.example.forumapi.repository.AnswerRepository;
import com.example.forumapi.repository.QuestionRepository;
import com.example.forumapi.repository.ReplyRepository;
import com.example.forumapi.repository.UserRepository;
import com.example.forumapi.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerImpl implements AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    List<Reply> replyList;

    public Answer uploadAns(Answer answer, long questionID, long userID) {
        Question que = questionRepository.findById(questionID).orElseThrow(
                () -> new ResourceNotExisted("Question Not exist","Id", questionID));

        Answer ans = new Answer();
        replyList = new ArrayList<>();
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
        String dateFormat = formatter.format(date);

        ans.setContent(answer.getContent());
        ans.setDate(dateFormat);
        ans.setUser(userRepository.findById(userID).orElseThrow(
                () -> new ResourceNotExisted("User Not exist","Id", userID)));
        ans.setQuestionId(questionID);
        ans.setReplies(replyList);

        que.getAnswer().add(ans);
        answerRepository.save(ans);

        return ans;
    }



    @Override
    public String deleteAnswer(long id, long userID) {
        Answer ans = answerRepository.findById(id).orElseThrow(
                () -> new ResourceNotExisted("answer Not exist",
                        "Id", id));

        Question parentQue = questionRepository.findById(ans.getQuestionId()).orElseThrow(
                () -> new ResourceNotExisted("Question Not exist","Id", ans.getQuestionId()));
        if(ans.getUser().getId() == userID) {
            parentQue.getAnswer().remove(ans);
            answerRepository.deleteById(ans.getId());
            return "Answer Deleted Successfully by User";
        }
        return "User has Not access to delete this Answer";
    }



    @Override
    public Answer updateAnswer(Answer answer, long id, long userID) {
        Answer ans = answerRepository.findById(id).orElseThrow(
                () -> new ResourceNotExisted("Answer Not exist",
                        "Id", id));
        if(ans.getUser().getId() == userID) {
            ans.setContent(answer.getContent());
            answerRepository.save(ans);
        }
        return ans;
    }


}