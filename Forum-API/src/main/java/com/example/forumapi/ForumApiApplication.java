package com.example.forumapi;

import com.example.forumapi.entity.Role;
import com.example.forumapi.entity.User;
import com.example.forumapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ForumApiApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(ForumApiApplication.class, args);
    }

    @Override
    public void run(String... args) {
        User adminAccount = userRepository.findByRole(Role.ADMIN);
        if (null == adminAccount){
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setFirstName("admin");
            user.setLastName("admin");
            user.setRole(Role.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);
        }
    }
}