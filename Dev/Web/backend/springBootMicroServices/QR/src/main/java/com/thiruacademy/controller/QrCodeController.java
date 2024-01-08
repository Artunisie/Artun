package com.thiruacademy.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thiruacademy.service.QrCodeGeneratorService;

@RestController
@RequestMapping("/qr")
public class QrCodeController {

    @Autowired
    private QrCodeGeneratorService qrCodeGeneratorService;

    @GetMapping(value = "/qrcode/{firstName}/{lastName}", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] generateQrCode(
            @PathVariable String firstName,
            @PathVariable String lastName,
            @RequestParam(defaultValue = "100") int width,
            @RequestParam(defaultValue = "100") int height
    ) throws IOException {
        String content = String.format("%s %s", firstName, lastName);
        return qrCodeGeneratorService.generateQrCodeImage(content, width, height);
    }
}
