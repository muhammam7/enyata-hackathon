package com.celpen.vynder.service;

import com.celpen.vynder.dto.request.CreateBrandRequest;
import com.celpen.vynder.dto.request.UpdateBrandRequest;
import com.celpen.vynder.dto.response.BrandResponse;
import com.celpen.vynder.model.Brand;
import com.celpen.vynder.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {

    BrandResponse createProfile(CreateBrandRequest request);

    BrandResponse update(UpdateBrandRequest request);

    Brand getBrandEntityByUser(User user);

    List<BrandResponse> getAllBrands();

    BrandResponse getBrandById(Long id);


}
