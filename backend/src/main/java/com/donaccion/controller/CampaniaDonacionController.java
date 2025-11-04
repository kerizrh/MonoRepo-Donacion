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
import java.util.Optional;

@RestController
@RequestMapping("/api/campanias")
public class CampaniaDonacionController {

    @Autowired
    private CampaniaDonacionRepository repository;

    @GetMapping
    public ResponseEntity<List<CampaniaDonacion>> listar(@AuthenticationPrincipal Jwt jwt) {
        if (!tieneRol(jwt, "osfl")) {
            return ResponseEntity.status(403).build();
        }
        String usuarioId = jwt.getSubject();
        List<CampaniaDonacion> campanias = repository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(campanias);
    }

    @PostMapping
    public ResponseEntity<CampaniaDonacion> crear(@RequestBody CampaniaDonacion body,
            @AuthenticationPrincipal Jwt jwt) {
        if (!tieneRol(jwt, "osfl")) {
            return ResponseEntity.status(403).build();
        }
        String usuarioId = jwt.getSubject();
        body.setUsuarioId(usuarioId);
        CampaniaDonacion saved = repository.save(body);
        return ResponseEntity.created(URI.create("/api/campanias/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampaniaDonacion> actualizar(@PathVariable Long id, @RequestBody CampaniaDonacion body,
            @AuthenticationPrincipal Jwt jwt) {
        if (!tieneRol(jwt, "osfl")) {
            return ResponseEntity.status(403).build();
        }
        String usuarioId = jwt.getSubject();
        return repository.findById(id)
                .filter(existing -> existing.getUsuarioId().equals(usuarioId))
                .map(existing -> {
                    existing.setNombre(body.getNombre());
                    existing.setDescripcion(body.getDescripcion());
                    existing.setFechaLimite(body.getFechaLimite());
                    existing.setMetaFondos(body.getMetaFondos());
                    existing.setMontoRecaudado(body.getMontoRecaudado());
                    existing.setImagen(body.getImagen());
                    existing.setCategorias(body.getCategorias());
                    CampaniaDonacion saved = repository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.status(403).build()); // Forbidden si no es el dueño
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        if (!tieneRol(jwt, "osfl")) {
            return ResponseEntity.status(403).build();
        }
        String usuarioId = jwt.getSubject();

        Optional<CampaniaDonacion> resultado = repository.findById(id)
                .filter(existing -> existing.getUsuarioId().equals(usuarioId));

        if (resultado.isPresent()) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 OK
        } else {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaniaDonacion> getById(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
    if (!(tieneRol(jwt, "donante") || tieneRol(jwt, "osfl"))) {
        return ResponseEntity.status(403).build();
    }

    return repository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}


    public boolean tieneRol(Jwt jwt, String rol) {
        List<String> roles = jwt.getClaimAsStringList("https://donaccion.com/claims/roles");
        return roles != null && roles.contains(rol);
    }

}
