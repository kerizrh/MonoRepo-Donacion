package com.donaccion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.donaccion.model.CampaniaDonacion;
import com.donaccion.repository.CampaniaDonacionRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/campanias")
public class CampaniaDonacionController {

    @Autowired
    private CampaniaDonacionRepository repository;

    @GetMapping
    public ResponseEntity<List<CampaniaDonacion>> listar(@AuthenticationPrincipal Jwt jwt) {
        // Solo verificar que llega un JWT válido; el email podría usarse para auditoría si se requiere
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<CampaniaDonacion> crear(@RequestBody CampaniaDonacion body, @AuthenticationPrincipal Jwt jwt) {
        CampaniaDonacion saved = repository.save(body);
        return ResponseEntity.created(URI.create("/api/campanias/" + saved.getId())).body(saved);
    }
}
