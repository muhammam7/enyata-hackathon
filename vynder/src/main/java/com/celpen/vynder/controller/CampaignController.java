package com.celpen.vynder.controller;


import com.celpen.vynder.dto.request.CreateCampaignRequest;
import com.celpen.vynder.dto.request.UpdateCampaignRequest;
import com.celpen.vynder.dto.response.CampaignResponse;
import com.celpen.vynder.model.User;
import com.celpen.vynder.service.CampaignService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin("*")
public class CampaignController {


    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @PostMapping
    public CampaignResponse create(@AuthenticationPrincipal User user, @RequestBody CreateCampaignRequest request) {
        return campaignService.create(user, request);
    }

    @PutMapping
    public CampaignResponse update(@AuthenticationPrincipal User user, @RequestBody UpdateCampaignRequest request) {
        return campaignService.update(user, request);
    }

    @GetMapping
    public List<CampaignResponse> getAll(@AuthenticationPrincipal User user) {
        return campaignService.getAll();
    }

}
