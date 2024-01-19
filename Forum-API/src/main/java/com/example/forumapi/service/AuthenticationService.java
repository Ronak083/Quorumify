package com.example.forumapi.service;

import com.example.forumapi.Dao.JwtAuthenticationResponse;
import com.example.forumapi.Dao.SignUpRequest;
import com.example.forumapi.Dao.SigninRequest;
import com.example.forumapi.entity.User;

public interface AuthenticationService {
    User signup(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signin(SigninRequest signinRequest);
}
