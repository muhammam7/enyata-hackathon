package com.celpen.vynder.service;

import com.celpen.vynder.dto.request.CreateCampaignRequest;
import com.celpen.vynder.dto.request.UpdateCampaignRequest;
import com.celpen.vynder.dto.response.CampaignResponse;
import com.celpen.vynder.model.User;

import java.util.List;

public interface CampaignService {

    CampaignResponse create(User user, CreateCampaignRequest request);

    CampaignResponse update(Long id,User user, UpdateCampaignRequest request);

    List<CampaignResponse> getAll(User user);

    void deleteCampaign(Long id, User currentUser);
}

