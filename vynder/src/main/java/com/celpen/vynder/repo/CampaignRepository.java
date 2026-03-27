package com.celpen.vynder.repo;

import com.celpen.vynder.model.Brand;
import com.celpen.vynder.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    List<Campaign> findAllByBrand(Brand brand);
}
