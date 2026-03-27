package com.celpen.vynder.service;

import com.celpen.vynder.dto.request.CreateCreatorRequest;
import com.celpen.vynder.dto.request.UpdateCreatorRequest;
import com.celpen.vynder.dto.response.CreatorResponse;
import com.celpen.vynder.model.Creator;
import com.celpen.vynder.model.User;

import java.util.List;
import java.util.Optional;

public interface CreatorService {

    CreatorResponse createProfile(CreateCreatorRequest request);

    CreatorResponse update(UpdateCreatorRequest request);

    List<CreatorResponse> getAllCreators();

    Optional<CreatorResponse> getCreatorById(Long id);

    Creator getCreatorEntityByUser(User user);

    Optional<CreatorResponse> getByUserId(Long userId);
}
