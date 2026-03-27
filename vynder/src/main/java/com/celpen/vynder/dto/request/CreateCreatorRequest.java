package com.celpen.vynder.dto.request;

import lombok.Data;

@Data
public class CreateCreatorRequest {

    private String email; // identify user

    private String name;
    private String niche;

    private String about;

}
