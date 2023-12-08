package com.example.chatservice.payload.response;

import lombok.Data;
@Data
public class UserInfoResponse {
	private Long id;
	private String firstName;
	private String lastName ;
	private String email;


	public UserInfoResponse(Long id, String FirstName , String LastName, String email) {
		this.id = id;
		this.firstName = FirstName;
		this.lastName= LastName ;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}




}
