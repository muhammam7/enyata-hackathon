package com.celpen.vynder.service.implementation;


import com.celpen.vynder.dto.request.CreateCampaignRequest;
import com.celpen.vynder.dto.request.UpdateCampaignRequest;
import com.celpen.vynder.dto.response.CampaignResponse;
import com.celpen.vynder.model.Brand;
import com.celpen.vynder.model.Campaign;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.CampaignRepository;
import com.celpen.vynder.service.AuthService;
import com.celpen.vynder.service.BrandService;
import com.celpen.vynder.service.CampaignService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final AuthService authService;
    private final BrandService brandService;


    public CampaignResponse create(CreateCampaignRequest request) {

        User brandUser = authService.getUserEntityByEmail(request.getBrandEmail());

        if (!brandUser.getRole().name().equals("BRAND")) {
            throw new RuntimeException("Only BRAND users can create campaigns");
        }

        Brand brand = brandService.getBrandEntityByUser(brandUser);

        Campaign campaign = Campaign.builder()
                .brand(brand)
                .title(request.getTitle())
                .description(request.getDescription())
                .budget(request.getBudget())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        Campaign saved = campaignRepository.save(campaign);

        return mapToResponse(saved);
    }

    public CampaignResponse update(UpdateCampaignRequest request) {
        Campaign campaign = campaignRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        campaign.setTitle(request.getTitle());
        campaign.setDescription(request.getDescription());
        campaign.setBudget(request.getBudget());
        campaign.setStartDate(request.getStartDate());
        campaign.setEndDate(request.getEndDate());

        Campaign updated = campaignRepository.save(campaign);

        return mapToResponse(updated);
    }

    public List<CampaignResponse> getAll() {
        return campaignRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private CampaignResponse mapToResponse(Campaign campaign) {
        return CampaignResponse.builder()
                .id(campaign.getId())
                .title(campaign.getTitle())
                .description(campaign.getDescription())
                .budget(campaign.getBudget())
                .startDate(campaign.getStartDate())
                .endDate(campaign.getEndDate())
                .brandName(campaign.getBrand().getCompanyName())
                .brandEmail(campaign.getBrand().getUser().getEmail())
                .build();
    }

}
