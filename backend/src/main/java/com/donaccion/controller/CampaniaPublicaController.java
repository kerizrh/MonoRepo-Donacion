package com.donaccion.controller;

import com.donaccion.model.CampaniaDonacion;
import com.donaccion.repository.CampaniaDonacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/public/campanias")
public class CampaniaPublicaController {

    @Autowired
    private final CampaniaDonacionRepository repository;

    public CampaniaPublicaController(CampaniaDonacionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/activas")
    public ResponseEntity<List<CampaniaDonacion>> listarActivas(@AuthenticationPrincipal Jwt jwt) {
        if (!tieneRol(jwt, "donante")) {
            return ResponseEntity.status(403).build();
        }
        LocalDate hoy = LocalDate.now();
        List<CampaniaDonacion> activas = repository.findByFechaLimiteGreaterThanEqual(hoy);
        return ResponseEntity.ok(activas);
    }

    public boolean tieneRol(Jwt jwt, String rol) {
        List<String> roles = jwt.getClaimAsStringList("https://donaccion.com/claims/roles");
        return roles != null && roles.contains(rol);
    }
}
