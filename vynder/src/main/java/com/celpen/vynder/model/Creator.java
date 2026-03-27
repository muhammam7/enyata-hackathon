package com.celpen.vynder.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Table(name = "creators")
@Builder
public class Creator extends AbstractEntity{



    private String name;
    @Enumerated(EnumType.STRING)
    private Niche niche;          // Tech, Lifestyle, etc.

    private String about;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;             // Linked account


}
