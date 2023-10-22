package com.Mohamed.userService.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
public class Technician extends User{
    private double hourlyRate;
    private double rating;

    @Override
    public String toString() {
        return  super.toString() + "Technician{" +
                "hourlyRate='" + hourlyRate + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}

