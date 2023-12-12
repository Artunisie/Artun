package com.example.chatservice.payload.request;

public class MessageRequest {


    	private String message;

	public MessageRequest(String message) {
	    this.message = message;
	  }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
