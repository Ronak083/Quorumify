package com.example.forumapi.Controller;

import com.example.forumapi.entity.Question;
import com.example.forumapi.service.AnswerService;
import com.example.forumapi.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/moderator")
public class ModeratorController {
    private final QuestionService questionService;
    @PutMapping("/updateQue/{id}")
    public ResponseEntity<Question> updateQ(@RequestBody Question que, @PathVariable String id){
        return  ResponseEntity.ok(questionService.updateQuestion(que, Long.parseLong(id)));
    }
}