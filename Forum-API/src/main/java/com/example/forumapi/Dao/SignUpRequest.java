package com.example.forumapi.Dao;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SignUpRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}