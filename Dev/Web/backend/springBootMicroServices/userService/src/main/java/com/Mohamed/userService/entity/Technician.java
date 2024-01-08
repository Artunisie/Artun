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
<<<<<<< HEAD
    private double rating;

   @Override
   public String toString() {
        return  super.toString() + "Technician{" +
                ", rating='" + rating + '\'' +
               '}';
  }
=======
     //private double rating;

     /*@Override
     public String toString() {
         return  super.toString() + "Technician{" +
                 ", rating='" + rating + '\'' +
                 '}';
     }*/


>>>>>>> 131adcc0678076388b19741e9ca2599f75c81b52
 }

