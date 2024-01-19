package com.example.forumapi.Controller;

import com.example.forumapi.service.AnswerService;
import com.example.forumapi.service.QuestionService;
import com.example.forumapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.forumapi.entity.User;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final QuestionService questionService;
    private final UserService userService;

    @DeleteMapping("/deleteQue/{id}")
    public ResponseEntity<String> deleteQ(@PathVariable String id){
        return  ResponseEntity.ok(questionService.deleteQuestion(Long.parseLong(id)));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAll());
    }

    @PutMapping("/updateRoleToMOD/{id}")
    public ResponseEntity<User> updateRoleToMOD(@PathVariable String id){
        return ResponseEntity.ok(userService.updateToModerator(Long.parseLong(id)));
    }

    @PutMapping("/updateRoleToUser/{id}")
    public ResponseEntity<User> updateRoleToUSR(@PathVariable String id){
        return ResponseEntity.ok(userService.updateToUser(Long.parseLong(id)));
    }

}