package com.donaccion.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario_puntos")
public class UsuarioPuntos {

    @Id
    private String usuarioId; // El mismo ID (sub) que viene en el JWT

    private Integer puntos;

    public UsuarioPuntos() {}

    public UsuarioPuntos(String usuarioId, Integer puntos) {
        this.usuarioId = usuarioId;
        this.puntos = puntos;
    }

    public String getUsuarioId() { return usuarioId; }
    public void setUsuarioId(String usuarioId) { this.usuarioId = usuarioId; }
    public Integer getPuntos() { return puntos; }
    public void setPuntos(Integer puntos) { this.puntos = puntos; }
}