/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.dtos;

import com.example.server.pojos.Groups;
import com.example.server.pojos.Letters;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Users;
import java.util.Date;
import java.util.Set;
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
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String avatar;
    private String bgImage;
    private String phone;
    private Date createdAt;
    private Boolean isActive;
    private String role;
    private Date updatedAt;
    private String studentId;
    private String academicYear;
    private Majors majorId;
    private Set<Groups> groupsSet;
    private Set<Letters> letterSet;
}
