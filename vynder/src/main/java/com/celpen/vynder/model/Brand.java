package com.celpen.vynder.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Builder
@Entity
@Data
@Table(name = "builder")
public class Brand extends AbstractEntity {


    private String companyName;

    private String industry;

    private String website;

    private String description;

    private String logoUrl;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
