/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.dtos;

import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import java.sql.Timestamp;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author maidv
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    private Long id;
    @NotBlank
    private String content;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Boolean isLocked;
    private Users userId;
    
}
