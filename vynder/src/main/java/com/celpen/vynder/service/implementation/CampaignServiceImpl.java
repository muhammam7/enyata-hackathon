package com.celpen.vynder.service.implementation;


import com.celpen.vynder.dto.request.CreateCampaignRequest;
import com.celpen.vynder.dto.request.UpdateCampaignRequest;
import com.celpen.vynder.dto.response.CampaignResponse;
import com.celpen.vynder.exception.InvalidRequestException;
import com.celpen.vynder.model.Brand;
import com.celpen.vynder.model.Campaign;
import com.celpen.vynder.model.CampaignStatus;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.BrandRepository;
import com.celpen.vynder.repo.CampaignRepository;
import com.celpen.vynder.service.AuthService;
import com.celpen.vynder.service.BrandService;
import com.celpen.vynder.service.CampaignService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final AuthService authService;
    private final BrandService brandService;
    private final BrandRepository brandRepository;


    public CampaignResponse create(User user, CreateCampaignRequest request) {

        Brand brand = brandService.getBrandEntityByUser(user);


        Campaign campaign = Campaign.builder()
                .brand(brand)
                .title(request.getTitle())
                .description(request.getDescription())
                .budget(request.getBudget())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .campaignStatus(request.getStatus() != null ? request.getStatus() : CampaignStatus.DRAFT)
                .build();

        Campaign saved = campaignRepository.save(campaign);

        return mapToResponse(saved);
    }

    public CampaignResponse update(Long id, User user, UpdateCampaignRequest request) {
        Campaign campaign = campaignRepository.findById(request.getId())
                .orElseThrow(() -> new EntityNotFoundException("Campaign not found"));

        campaign.setTitle(request.getTitle());
        campaign.setTitle(request.getTitle());
        campaign.setDescription(request.getDescription());
        campaign.setBudget(request.getBudget());
        campaign.setStartDate(request.getStartDate());
        campaign.setEndDate(request.getEndDate());

        Campaign updated = campaignRepository.save(campaign);

        return mapToResponse(updated);
    }

    public List<CampaignResponse> getAll(User user) {

        Brand brand = null;

        try {
            brand = brandRepository.findByUser(user)
                    .orElseThrow(() -> new AccessDeniedException("No brand profile found for this user"));
        } catch (AccessDeniedException e) {
            throw new RuntimeException(e);
        }

        return campaignRepository.findAllByBrand(brand)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCampaign(Long id, User currentUser) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Campaign not found"));

        if (!campaign.getBrand().getUser().getId().equals(currentUser.getId())){
            throw new AccessDeniedException("You do not own this campaign");

        }

        campaignRepository.delete(campaign);
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
