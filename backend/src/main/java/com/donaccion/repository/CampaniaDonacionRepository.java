package com.donaccion.repository;

import com.donaccion.model.CampaniaDonacion;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaniaDonacionRepository extends JpaRepository<CampaniaDonacion, Long> {
    List<CampaniaDonacion> findByUsuarioId(String usuarioId);
    List<CampaniaDonacion> findByFechaLimiteGreaterThanEqual(LocalDate fecha);
}
