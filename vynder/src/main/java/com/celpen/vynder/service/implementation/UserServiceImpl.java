package com.celpen.vynder.service.implementation;

import com.celpen.vynder.config.CloudinaryService;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.UserRepository;
import com.celpen.vynder.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;

    @Override
    public String uploadProfilePicture(MultipartFile file, User currentUser) {

        // delete old picture if exists
        if (currentUser.getProfilePicture() != null) {
            cloudinaryService.deleteImage(currentUser.getProfilePicture());
        }

        String imageUrl = cloudinaryService.uploadImage(file, "profile_pictures");
        currentUser.setProfilePicture(imageUrl);
        userRepository.save(currentUser);

        return imageUrl;
    }
}
