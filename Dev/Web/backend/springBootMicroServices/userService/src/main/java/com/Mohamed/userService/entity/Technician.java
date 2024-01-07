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
     private double rating;

     @Override
     public String toString() {
         return  super.toString() + "Technician{" +
                 ", rating='" + rating + '\'' +
                 '}';
     }
 }

