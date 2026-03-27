package com.celpen.vynder.service.implementation;

import com.celpen.vynder.config.JwtService;
import com.celpen.vynder.config.SecurityConfig;
import com.celpen.vynder.config.UserDetailsServiceImpl;
import com.celpen.vynder.dto.request.LoginRequest;
import com.celpen.vynder.dto.request.SignupRequest;
import com.celpen.vynder.dto.response.AuthResponse;
import com.celpen.vynder.exception.InvalidRequestException;
import com.celpen.vynder.model.Role;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.UserRepository;
import com.celpen.vynder.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserRepository userRepository;
    private final SecurityConfig securityConfig;



    // Signup user
    public AuthResponse signup(SignupRequest request) {

        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new InvalidRequestException("Email is required");
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new InvalidRequestException("Password is required");
        }

        if (request.getRole() == null || request.getRole().isEmpty()) {
            throw new InvalidRequestException("Role is required");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new InvalidRequestException("Email already exists");
        }
        Role userRole;

        String roleStr = request.getRole().toUpperCase();

        if (roleStr.equals("BRAND")) {
            userRole = Role.BRAND;
        } else if (roleStr.equals("CREATOR")) {
            userRole = Role.CREATOR;
        } else {
            throw new RuntimeException("Invalid role");

        }

        String encodedPassword = securityConfig.passwordEncoder().encode(request.getPassword());

        User user = User.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .role(userRole)
                .build();

        User saved = userRepository.save(user);

        return mapToResponse(saved);
    }


    // Login user
    public AuthResponse login(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userDetailsService.loadUserByUsername(request.getEmail());
        return AuthResponse.builder()
                .email(user.getUsername())
                .role(user.getAuthorities().stream()
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse("UNKNOWN"))
                .token(jwtService.generateToken(user))
                .build();
    }

    public User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private AuthResponse mapToResponse(User user) {
        return AuthResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }


}


