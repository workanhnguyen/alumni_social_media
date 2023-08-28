/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;

import com.example.server.pojos.Images;
import com.example.server.pojos.Posts;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author maidv
 */
public interface ImageService {
    Images addImage(MultipartFile image, Posts p);
}
