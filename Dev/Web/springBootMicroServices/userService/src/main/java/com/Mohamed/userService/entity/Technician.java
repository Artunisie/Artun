package com.Mohamed.userService.entity;

import jakarta.persistence.Entity;

import java.util.List;

@Entity
public class Technician extends User{
    private double hourlyRate;
    private double rating;

}
