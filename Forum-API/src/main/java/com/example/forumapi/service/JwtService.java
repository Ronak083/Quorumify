package com.example.forumapi.service;

import com.example.forumapi.Dao.JwtAuthUserDetails;
import com.example.forumapi.Dao.JwtAuthenticationResponse;
import org.springframework.security.core.userdetails.UserDetails;


public interface JwtService {
    String extractUserName(String token);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);
}
