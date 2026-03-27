package com.celpen.vynder.controller;


import com.celpen.vynder.dto.request.LoginRequest;
import com.celpen.vynder.dto.request.SignupRequest;
import com.celpen.vynder.dto.response.AuthResponse;
import com.celpen.vynder.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

}
