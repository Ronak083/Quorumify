package com.example.forumapi.service.impl;

import com.example.forumapi.Dao.JwtAuthUserDetails;
import com.example.forumapi.entity.Role;
import com.example.forumapi.entity.User;
import com.example.forumapi.config.ResourceNotExisted;
import com.example.forumapi.repository.UserRepository;
import com.example.forumapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
                return userRepository.findByEmail(username);
            }
        };
    }

    @Override
    public User updateToModerator(long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotExisted("user",
                        "Id", id));
        user.setRole(Role.MODERATOR);
        userRepository.save(user);
        return user;
    }

    @Override
    public User updateToUser(long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotExisted("user",
                        "Id", id));
        user.setRole(Role.USER);
        userRepository.save(user);
        return user;
    }

    @Override
    public User getDetail(long userID) {
        User user = userRepository.findById(userID).orElseThrow(
                () -> new ResourceNotExisted("user",
                        "Id", userID));
        return user;
    }

    @Override
    public User updateBio(User user, long userID) {
        User u = userRepository.findById(userID).orElseThrow(
                () -> new ResourceNotExisted("user",
                        "Id", userID));
        u.setBio(user.getBio());
        userRepository.save(U);
        return u;
    }


    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }


    @Override
    public JwtAuthUserDetails getUserInfo(String email, Role role) {
        JwtAuthUserDetails userDetails = new JwtAuthUserDetails();
        userDetails.setUsername(email);
        userDetails.setRole(role);
        return userDetails;
    }
        
}