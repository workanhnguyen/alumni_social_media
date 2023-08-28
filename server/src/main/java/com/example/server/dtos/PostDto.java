/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.dtos;

import com.example.server.pojos.Images;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
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
    private String content;
    private Date createdAt;
    private Date updatedAt;
    private Boolean isLocked;
    private UserDto user;
    private List<ImageDto> images;
    
}
