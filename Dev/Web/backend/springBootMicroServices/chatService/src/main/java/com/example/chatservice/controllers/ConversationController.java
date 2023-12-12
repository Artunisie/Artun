package com.example.chatservice.controllers;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.File;
import com.example.chatservice.models.Message;
import com.example.chatservice.models.User;
import com.example.chatservice.payload.request.ConversationAndMessagesResponse;
import com.example.chatservice.payload.request.ConversationDTO;
import com.example.chatservice.repository.ConversationRepository;
import com.example.chatservice.repository.FileRepository;
import com.example.chatservice.repository.MessageRepository;
import com.example.chatservice.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/conversations")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
public class ConversationController {

    private final ConversationRepository conversationRepository;

    @Autowired
    public ConversationController(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

  @Autowired
  private FileRepository fileRepository ; 

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository  ; 

    @GetMapping("/getAll/{userId}")
    public List<ConversationDTO> getConversations( @PathVariable Long userId ) {
     User user = userRepository.findById(userId).get();
        List<Conversation> conversationList = conversationRepository.findByUsers(user);
        List<ConversationDTO> dtoList = conversationList.stream()
            .map(ConversationDTO::ConversationToDTO)
            .collect(Collectors.toList());
            return dtoList ; 
    }


     @GetMapping("/getLastMessage/{conversationId}")
    public ResponseEntity getLastMessageInConversation(@PathVariable Long conversationId) {
        // Call your service to get the last message by conversationId
      
        Conversation conv =  conversationRepository.findById(conversationId).get() ; 
if (conv.getMessages().size()>1 ) {
            Message lastMessage = conv.getMessages().get(conv.getMessages().size()-1)  ;
            return ResponseEntity.ok(lastMessage);
        } else if (conv!=null) {
            return ResponseEntity.ok("");
        }
        else{
            return ResponseEntity.notFound().build() ; 
        }
    }

    @GetMapping("/getConversation/{conversationId}")
    public ResponseEntity<ConversationAndMessagesResponse> getConversation(@PathVariable Long conversationId) {
        //   System.out.println(conversationId);
        Conversation conversation = conversationRepository.findById(conversationId).get() ;
        ConversationAndMessagesResponse response = new ConversationAndMessagesResponse(conversation) ;   ;
  return ResponseEntity.ok(response) ; 
 }

    @GetMapping("/getConversationMessages/{conversationId}")
    public ResponseEntity<List<Message>> getConversationMessages(@PathVariable Long conversationId) {
        //  System.out.println(conversationId);
        Conversation conversation = conversationRepository.findById(conversationId).get() ;

        List<Message> messages = conversation.getMessages()  ; 
        return ResponseEntity.ok(messages);
    }

// ...

@PostMapping(value = "sendMessage", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<Map<String, String>> sendMessage(@RequestParam(value="content" , required = false) String content,
                                                   @RequestParam(value = "conversationId") Long conversationId,
                                                   @RequestParam("senderId") Long senderId,
                                                   @RequestParam(value="files" , required=false) MultipartFile[] files) {
    if ((content == null || content.isEmpty()) &&
    (files == null || files.length==0)) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Message cannot be fully empty");
    return ResponseEntity.badRequest().body(response);
}

    Message message = new Message();
    
    try {
        message.setContent(content);
        message.setConversation(conversationRepository.findById(conversationId)
                .orElseThrow(() -> new EntityNotFoundException("No conversation found")));
        message.setSender(userRepository.findById(senderId).get());
        message.setTimestamp(LocalDateTime.now());
       if (files != null && !(files.length==0)) {
            List<File> messageFiles = new ArrayList<>();
            for (MultipartFile file : files) {
                File messageFile = new File();
                messageFile.setFileName(file.getOriginalFilename());
                System.out.println(messageFile.getFileName());
                messageFile.setData(file.getBytes());
                messageFile.setMessage(message);
                messageFiles.add(messageFile);
            }

            message.setFiles(messageFiles);
        }

    } catch (EntityNotFoundException e ) {
        System.out.println("An entity wasn't found in the database");
        Map<String, String> response = new HashMap<>();
        response.put("error", "An entity wasn't found in the database");
        return ResponseEntity.badRequest().body(response);
    }catch (IOException e){
                System.out.println("temporary store failed getting bytes from file");
        Map<String, String> response = new HashMap<>();
        response.put("error", "store failur");
        return ResponseEntity.badRequest().body(response);
    }

    messageRepository.save(message);
    
    Map<String, String> response = new HashMap<>();
    response.put("message", "Message sent successfully");
    
    return ResponseEntity.ok(response);
}


}

