package com.celpen.vynder.controller;

import com.celpen.vynder.config.CloudinaryService;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.UserRepository;
import com.celpen.vynder.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PatchMapping("/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User currentUser) {

        String imageUrl = userService.uploadProfilePicture(file, currentUser);
        return ResponseEntity.ok(Map.of("profilePicture", imageUrl));
    }
}