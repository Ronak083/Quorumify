package com.example.forumapi.service;

import com.example.forumapi.Dao.JwtAuthUserDetails;
import com.example.forumapi.entity.Role;
import com.example.forumapi.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService {
     UserDetailsService userDetailsService();

    List<User> getAll();
    JwtAuthUserDetails getUserInfo(String email, Role role);
    User updateToModerator(long id);
    User updateToUser(long id);
    User getDetail(long userID);

    User updateBio(User user, long id);
}