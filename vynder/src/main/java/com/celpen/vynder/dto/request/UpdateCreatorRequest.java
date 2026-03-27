package com.celpen.vynder.dto.request;


import lombok.Data;

@Data
public class UpdateCreatorRequest {

    private Long CreatorId;

    private String name;           // Display name
    private String niche;

    private String about;// Tech, Lifestyle, etc.


}
