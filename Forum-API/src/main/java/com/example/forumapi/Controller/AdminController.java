package com.example.forumapi.Controller;

import com.example.forumapi.entity.Answer;
import com.example.forumapi.entity.Question;
import com.example.forumapi.entity.Reply;
import com.example.forumapi.service.AnswerService;
import com.example.forumapi.service.QuestionService;
import com.example.forumapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.forumapi.entity.User;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

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