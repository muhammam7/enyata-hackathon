package com.celpen.vynder.controller;

import com.celpen.vynder.dto.request.CreateBrandRequest;
import com.celpen.vynder.dto.request.UpdateBrandRequest;
import com.celpen.vynder.dto.response.BrandResponse;
import com.celpen.vynder.service.BrandService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin("*")
//@AllArgsConstructor
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }



    @PostMapping
    public BrandResponse create(@RequestBody CreateBrandRequest request) {
        return brandService.createProfile(request);
    }

    @PutMapping
    public BrandResponse update(@RequestBody UpdateBrandRequest request) {
        return brandService.update(request);
    }

    @GetMapping
    public List<BrandResponse> getAll() {
        return brandService.getAllBrands();
    }

}
