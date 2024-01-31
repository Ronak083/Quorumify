package com.example.forumapi.service;

import com.example.forumapi.entity.Reply;

public interface ReplyService {
    Reply uploadRep(Reply reply, long id, long userID);

    String deleteReply(long rid, long userID);

    Reply updateReply(Reply reply, long l, long userID);
}