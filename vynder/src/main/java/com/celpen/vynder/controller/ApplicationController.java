package com.celpen.vynder.controller;


import com.celpen.vynder.dto.request.CreateApplicationRequest;
import com.celpen.vynder.dto.request.UpdateApplicationStatusRequest;
import com.celpen.vynder.dto.response.ApplicationResponse;
import com.celpen.vynder.service.ApplicationService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
//@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ApplicationResponse apply(@RequestBody CreateApplicationRequest request) {
        return applicationService.apply(request);
    }

    @PutMapping("/status")
    public ApplicationResponse updateStatus(@RequestBody UpdateApplicationStatusRequest request) {
        return applicationService.updateStatus(request);
    }

    @GetMapping("/campaign/{campaignId}")
    public List<ApplicationResponse> getByCampaign(@PathVariable Long campaignId) {
        return applicationService.getByCampaign(campaignId);
    }

}
