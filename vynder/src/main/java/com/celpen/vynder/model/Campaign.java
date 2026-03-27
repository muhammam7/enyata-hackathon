package com.celpen.vynder.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Entity
@Data
@Table(name = "campaigns")
public class Campaign extends AbstractEntity {



    private String title;
    private String description;
    private double budget;
    private LocalDateTime startDate;
    private LocalDateTime endDate;


    @Enumerated(EnumType.STRING)
    private CampaignStatus campaignStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

}
