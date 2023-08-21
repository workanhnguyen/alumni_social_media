/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.dtos;

import com.example.server.pojos.Users;

/**
 *
 * @author maidv
 */
public class UserDto {
    private String token;
    private Users user;

    public void setToken(String token) {
        this.token = token;
    }

    public void setUser(Users user) {
        this.user = user;
   }
}
