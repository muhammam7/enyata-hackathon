package com.celpen.vynder.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {

        private Long id;
        private String email;
        private String role;
        private String token;

    @Data
    @Builder
    public static class PaymentResponse {
        private Long id;
        private double amount;
        private String status;
        private String transactionRef;
    }
}
