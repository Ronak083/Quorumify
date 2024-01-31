package com.example.forumapi.service.impl;

import com.example.forumapi.config.ResourceNotExisted;
import com.example.forumapi.entity.Answer;
import com.example.forumapi.entity.Question;
import com.example.forumapi.entity.Reply;
import com.example.forumapi.repository.AnswerRepository;
import com.example.forumapi.repository.QuestionRepository;
import com.example.forumapi.repository.ReplyRepository;
import com.example.forumapi.repository.UserRepository;
import com.example.forumapi.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class ReplyImpl implements ReplyService {
    private final AnswerRepository answerRepository;
    private final ReplyRepository replyRepository;
    private final UserRepository userRepository;

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
                () -> new ResourceNotExisted("User Not exist","Id", userID)));

        parentAnswer.getReplies().add(reply);

        replyRepository.save(reply);
        return reply;
    }

    @Override
    public String deleteReply(long aID, long userID) {
        Reply reply = replyRepository.findById(aID).orElseThrow(
                () -> new ResourceNotExisted("reply Not exist",
                        "Id", aID));


        Answer parentAnswer = answerRepository.findById(reply.getAnswerId()).orElseThrow(
                () -> new ResourceNotExisted("Answer Not exist","Id", reply.getAnswerId()));
        if(reply.getUser().getId() == userID) {
            parentAnswer.getReplies().remove(reply);
            replyRepository.deleteById(reply.getId());
            return "Reply Deleted Successfully by User";
        }
        return "User has Not access to delete this Reply";
    }

    @Override
    public Reply updateReply(Reply reply, long id, long userID) {
        Reply rep = replyRepository.findById(id).orElseThrow(
                () -> new ResourceNotExisted("Reply Not exist",
                        "Id", id));
        if(rep.getUser().getId() == userID) {
            rep.setContent(reply.getContent());
            replyRepository.save(rep);
        }
        return rep;
    }
}