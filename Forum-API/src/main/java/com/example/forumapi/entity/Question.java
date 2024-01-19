package com.example.forumapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "question_table")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String content;
    private String Date;
    @ManyToOne
    private User user;
    @OneToMany
    private List<Answer> answer;

}