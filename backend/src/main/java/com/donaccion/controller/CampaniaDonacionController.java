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
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<CampaniaDonacion> crear(@RequestBody CampaniaDonacion body, @AuthenticationPrincipal Jwt jwt) {
        CampaniaDonacion saved = repository.save(body);
        return ResponseEntity.created(URI.create("/api/campanias/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampaniaDonacion> actualizar(@PathVariable Long id, @RequestBody CampaniaDonacion body, @AuthenticationPrincipal Jwt jwt) {
        return repository.findById(id)
            .map(existing -> {
                existing.setNombre(body.getNombre());
                existing.setDescripcion(body.getDescripcion());
                existing.setFechaLimite(body.getFechaLimite());
                existing.setMetaFondos(body.getMetaFondos());
                existing.setMontoRecaudado(body.getMontoRecaudado());
                existing.setImagen(body.getImagen());
                CampaniaDonacion saved = repository.save(existing);
                return ResponseEntity.ok(saved);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }



  @GetMapping("/{id}")
  public ResponseEntity<CampaniaDonacion> getById(@PathVariable Long id) {
    return repository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
