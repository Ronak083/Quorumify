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
    private final ReplyRepository replyRepository;
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
                () -> new ResourceNotExisted("Answer Not exist","Id", userID)));
        ans.setQuestionId(questionID);
        ans.setReplies(replyList);

        que.getAnswer().add(ans);
        answerRepository.save(ans);

        return ans;
    }

    @Override
    public Reply uploadRep(Reply rep, long answerID, long userID) {

        Answer parentAnswer = answerRepository.findById(answerID).orElseThrow(
                () -> new ResourceNotExisted("Answer Not exist","Id", answerID));

        Reply reply = new Reply();
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
        String dateFormat = formatter.format(date);

        reply.setAnswerId(answerID);
        reply.setDate(dateFormat);
        reply.setContent(rep.getContent());
        reply.setUser(userRepository.findById(userID).orElseThrow(
                () -> new ResourceNotExisted("Reply Not exist","Id", userID)));

        parentAnswer.getReplies().add(reply);

        replyRepository.save(reply);
        return reply;
    }

    @Override
    public String deleteAnswerbyUser(long id, long userID) {
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
    public String deleteReplybyUser(long aID, long userID) {
        Reply r = replyRepository.findById(aID).orElseThrow(
                () -> new ResourceNotExisted("reply Not exist",
                        "Id", aID));


        Answer parentAnswer = answerRepository.findById(r.getAnswerId()).orElseThrow(
                () -> new ResourceNotExisted("Answer Not exist","Id", r.getAnswerId()));
        if(r.getUser().getId() == userID) {
            parentAnswer.getReplies().remove(r);
            replyRepository.deleteById(r.getId());
            return "Reply Deleted Successfully by User";
        }
        return "User has Not access to delete this Reply";
    }
}