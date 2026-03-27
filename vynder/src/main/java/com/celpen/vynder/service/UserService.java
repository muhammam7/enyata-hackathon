package com.celpen.vynder.service;

import com.celpen.vynder.model.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    String uploadProfilePicture(MultipartFile file, User currentUser);
};

