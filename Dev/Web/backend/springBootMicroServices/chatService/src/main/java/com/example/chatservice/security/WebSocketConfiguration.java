package com.example.chatservice.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {


    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/start");//the path when it starts to connect 
        config.setApplicationDestinationPrefixes("/current");//the path after connection
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/testchat")
                .setAllowedOrigins("http://localhost:4200").withSockJS();
    }
    //     protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
    //     messages
    //             .simpDestMatchers("/public/**").permitAll() // Public paths that don't require authentication
    //             .simpDestMatchers("/user/**").authenticated(); // Paths that require authentication
    // }

    

    
}