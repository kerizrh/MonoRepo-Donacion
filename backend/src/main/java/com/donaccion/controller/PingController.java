package com.donaccion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donaccion.model.Ping;
import com.donaccion.repository.PingRepository;

@RestController
@RequestMapping("/api")
public class PingController {

  @Autowired
  private PingRepository pingRepository;

  @GetMapping("/ping")
  public ResponseEntity<String> ping(@AuthenticationPrincipal Jwt jwt) {
    String email = jwt.getClaim("https://donaccion.com/claims/email");
    String mensaje = pingRepository.findById(1L)
      .map(Ping::getMensaje)
      .orElse("pong desde el server");
    return ResponseEntity.ok("🧪 " + mensaje + " — usuario: " + email);
  }
}
