package com.example.forumapi.Dao;

import com.example.forumapi.entity.Role;
import lombok.Data;

@Data
public class JwtAuthUserDetails {
    private String username;
    private Role role;
}
