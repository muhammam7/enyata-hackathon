package com.celpen.vynder.service.implementation;

import com.celpen.vynder.dto.request.CreateCreatorRequest;
import com.celpen.vynder.dto.request.UpdateCreatorRequest;
import com.celpen.vynder.dto.response.CreatorResponse;
import com.celpen.vynder.model.Creator;
import com.celpen.vynder.model.Niche;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.CreatorRepository;
import com.celpen.vynder.service.AuthService;
import com.celpen.vynder.service.CreatorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CreatorServiceImpl implements CreatorService {

    private final CreatorRepository creatorRepository;
    private final AuthService authService;


    // Create a new creator profile
    @Override
    public CreatorResponse createProfile(CreateCreatorRequest request) {

        User user = authService.getUserEntityByEmail(request.getEmail());

        if (!user.getRole().name().equals("CREATOR")) {
            throw new RuntimeException("Only CREATOR users allowed");
        }

        Niche niche = null;

        if (request.getNiche().equals("GRAPHICS")) {
            niche = Niche.GRAPHICS;
        } else if (request.getNiche().equals("ANIMATOR")) {
            niche = Niche.ANIMATOR;
        } else if (request.getNiche().equals("VIDEO")) {
            niche = Niche.VIDEO;
        }
        Creator creator = Creator.builder()
                .user(user)
                .name(request.getName())
                .niche(niche)
                .about(request.getAbout())
                .build();
        Creator saved = creatorRepository.save(creator); // <-- must save entity


        return mapToResponse(saved);

    }

    @Override
    public CreatorResponse update(UpdateCreatorRequest request) {
        Creator creator = creatorRepository.findById(request.getCreatorId())
                .orElseThrow(() -> new RuntimeException("Creator not found"));

        Niche niche = null;

        switch (request.getNiche()) {
            case "GRAPHICS" -> niche = Niche.GRAPHICS;
            case "ANIMATOR" -> niche = Niche.ANIMATOR;
            case "VIDEO" -> {
                niche = Niche.VIDEO;

                creator.setName(request.getName());
                creator.setNiche(niche);
                creator.setAbout(request.getAbout());

                Creator updated = creatorRepository.save(creator);

                return mapToResponse(updated);
            }
        }
       return null;
    }

    @Override
    public List<CreatorResponse> getAllCreators() {
        return creatorRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CreatorResponse> getCreatorById (Long id){
        return creatorRepository.findById(id)
                .map(this::mapToResponse);
    }

    @Override
    public Creator getCreatorEntityByUser (User user){
        return creatorRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Brand profile not found"));
    }

    @Override
    public Optional<CreatorResponse> getByUserId (Long userId){
        return creatorRepository.findByUserId(userId)
                .map(this::mapToResponse);
    }
    private CreatorResponse mapToResponse (Creator creator){

        String niche1 = "";

        if (creator.getNiche().name().equals("GRAPHICS")) {
            niche1 = "Graphics Designer";
        } else if (creator.getNiche().name().equals("ANIMATOR")) {
            niche1 = "Animator";
        } else if (creator.getNiche().name().equals("VIDEO")) {
            niche1 = "Videographer";
        }

        return CreatorResponse.builder()
                .id(creator.getId())
                .name(creator.getName())
                .niche(niche1)
                .about(creator.getAbout())
                .build();
    }
}