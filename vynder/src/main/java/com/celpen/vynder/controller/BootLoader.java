package com.celpen.vynder.controller;

import com.celpen.vynder.model.Role;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BootLoader implements ApplicationListener<ContextRefreshedEvent> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
//        User admin = new User();
//        admin.setEmail("muhammadimmammi7@gmail.com");
//        admin.setPassword(passwordEncoder.encode("12HorseCow34."));
//        admin.setRole(Role.ADMIN);
//        userRepository.save(admin);
    }
}
