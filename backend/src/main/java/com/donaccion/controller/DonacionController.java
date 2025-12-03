package com.donaccion.controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donaccion.service.DonacionService;

@RestController
@RequestMapping("/api/donaciones")
public class DonacionController {

    @Autowired
    private DonacionService donacionService;

    @PostMapping
    public ResponseEntity<?> donar(@RequestBody Map<String, Object> payload,
                                   @AuthenticationPrincipal Jwt jwt) {
        try {
            // Extraer datos
            Long campaniaId = Long.valueOf(payload.get("campaniaId").toString());
            BigDecimal monto = new BigDecimal(payload.get("monto").toString());
            String usuarioId = jwt.getSubject(); // El ID de Auth0

            // Procesar
            donacionService.realizarDonacion(usuarioId, campaniaId, monto);

            return ResponseEntity.ok(Map.of("mensaje", "Donación realizada con éxito"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/mis-puntos")
    public ResponseEntity<?> getPuntos(@AuthenticationPrincipal Jwt jwt) {
        String usuarioId = jwt.getSubject();
        Integer puntos = donacionService.obtenerPuntos(usuarioId);
        return ResponseEntity.ok(Map.of("puntos", puntos));
    }
}
