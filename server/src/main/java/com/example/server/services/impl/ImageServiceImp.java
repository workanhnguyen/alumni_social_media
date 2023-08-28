/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.server.pojos.Images;
import com.example.server.pojos.Posts;
import com.example.server.repositories.ImageRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.services.ImageService;
import java.awt.Image;
import java.io.IOException;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author maidv
 */
@Service
public class ImageServiceImp implements ImageService{

    @Autowired
    private Cloudinary cloudinary;
    
    @Autowired
    private ImageRepository imageRepo;
    
    @Override
    public Images addImage(MultipartFile image, Posts p) {
        Images i = new Images();
        if (!image.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(image.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                i.setImageUrl(res.get("secure_url").toString());
                i.setIsActive(true);
                i.setPostId(p);
                return this.imageRepo.addImage(i);
            } catch (IOException ex) {
                Logger.getLogger(UserServiceImp.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }
    
}
