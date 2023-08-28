/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories;

import com.example.server.pojos.Images;
import com.example.server.pojos.Posts;
import java.util.List;


/**
 *
 * @author maidv
 */
public interface ImageRepository {
    Images addImage(Images image);
    List<Images> findByPostId(Posts p);
}
