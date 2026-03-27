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

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final BrandRepository brandRepository;

    @Override
    public CampaignResponse createCampaign(CampaignRequest request, User currentUser) {
        Brand brand = brandRepository.findByUser(currentUser)
                .orElseThrow(() -> new AccessDeniedException("No brand profile found for this user"));

        Campaign campaign = Campaign.builder()
                .name(request.name())
                .description(request.description())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .budget(request.budget())
                .status(request.status() != null ? request.status() : CampaignStatus.DRAFT)
                .brand(brand)
                .build();

        return toResponse(campaignRepository.save(campaign));
    }

    @Override
    public List<CampaignResponse> getMyCampaigns(User currentUser) {
        Brand brand = brandRepository.findByUser(currentUser)
                .orElseThrow(() -> new AccessDeniedException("No brand profile found for this user"));

        return campaignRepository.findAllByBrand(brand)
                .stream().map(this::toResponse).toList();
    }

    @Override
    public CampaignResponse updateCampaign(Long id, CampaignRequest request, User currentUser) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Campaign not found"));

        if (!campaign.getBrand().getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not own this campaign");
        }

        campaign.setName(request.name());
        campaign.setDescription(request.description());
        campaign.setStartDate(request.startDate());
        campaign.setEndDate(request.endDate());
        campaign.setBudget(request.budget());
        campaign.setStatus(request.status());

        return toResponse(campaignRepository.save(campaign));
    }

    @Override
    public void deleteCampaign(Long id, User currentUser) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Campaign not found"));

        if (!campaign.getBrand().getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not own this campaign");
        }

        campaignRepository.delete(campaign);
    }

    private CampaignResponse toResponse(Campaign c) {
        return new CampaignResponse(
                c.getId(), c.getName(), c.getDescription(),
                c.getStartDate(), c.getEndDate(),
                c.getBudget(), c.getStatus(),
                c.getBrand().getId()
        );
    }
}