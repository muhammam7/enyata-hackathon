package com.celpen.vynder.controller;


import com.celpen.vynder.dto.request.CreateCampaignRequest;
import com.celpen.vynder.dto.request.UpdateCampaignRequest;
import com.celpen.vynder.dto.response.CampaignResponse;
import com.celpen.vynder.service.CampaignService;
import lombok.AllArgsConstructor;
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
    public CampaignResponse create(@RequestBody CreateCampaignRequest request) {
        return campaignService.create(request);
    }

    @PutMapping
    public CampaignResponse update(@RequestBody UpdateCampaignRequest request) {
        return campaignService.update(request);
    }

    @GetMapping
    public List<CampaignResponse> getAll() {
        return campaignService.getAll();
    }

}
