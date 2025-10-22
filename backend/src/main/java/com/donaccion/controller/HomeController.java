package com.donaccion.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "¡Bienvenido a Donaccion! El backend está funcionando correctamente.";
    }
    
    @GetMapping("/health")
    public String health() {
        return "Backend is healthy and running!";
    }
}
