package com.celpen.vynder.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateApplicationRequest {

    private String creatorEmail;

    private Long campaignId;

    private String message;



}

