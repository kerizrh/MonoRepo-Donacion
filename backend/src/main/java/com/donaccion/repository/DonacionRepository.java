package com.donaccion.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.donaccion.model.Donacion;

public interface DonacionRepository extends JpaRepository<Donacion, Long> {
    List<Donacion> findByUsuarioId(String usuarioId);
}