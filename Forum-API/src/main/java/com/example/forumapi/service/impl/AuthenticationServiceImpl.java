package com.example.forumapi.service.impl;

import com.example.forumapi.Dao.JwtAuthenticationResponse;
import com.example.forumapi.Dao.SignUpRequest;
import com.example.forumapi.Dao.SigninRequest;
import com.example.forumapi.entity.Role;
import com.example.forumapi.entity.User;
import com.example.forumapi.repository.UserRepository;
import com.example.forumapi.service.AuthenticationService;
import com.example.forumapi.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User signup(SignUpRequest signUpRequest){
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setFirstName(signUpRequest.getFirstname());
        user.setLastName(signUpRequest.getLastname());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        return userRepository.save(user);

    }

    public JwtAuthenticationResponse signin(SigninRequest signinRequest) throws IllegalArgumentException{
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
        var user = userRepository.findByEmail(signinRequest.getEmail());
        var jwt = jwtService.generateToken(user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        return jwtAuthenticationResponse;
    }
}