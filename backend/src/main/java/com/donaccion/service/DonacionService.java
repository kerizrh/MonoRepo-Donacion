package com.donaccion.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.donaccion.model.CampaniaDonacion;
import com.donaccion.model.Donacion;
import com.donaccion.model.UsuarioPuntos;
import com.donaccion.repository.CampaniaDonacionRepository;
import com.donaccion.repository.DonacionRepository;
import com.donaccion.repository.UsuarioPuntosRepository;

@Service
public class DonacionService {

    @Autowired
    private DonacionRepository donacionRepo;
    
    @Autowired
    private CampaniaDonacionRepository campaniaRepo; 
    
    @Autowired
    private UsuarioPuntosRepository usuarioPuntosRepo;

    @Transactional
    public void realizarDonacion(String usuarioId, Long campaniaId, BigDecimal monto) {
        // 1. Buscar la campaña 
        CampaniaDonacion campania = campaniaRepo.findById(campaniaId)
                .orElseThrow(() -> new RuntimeException("Campaña no encontrada"));

        // 2. Actualizar lo recaudado
        // Si es null, iniciamos en 0 para evitar error
        BigDecimal actual = campania.getMontoRecaudado() == null ? BigDecimal.ZERO : campania.getMontoRecaudado();
        campania.setMontoRecaudado(actual.add(monto));
        campaniaRepo.save(campania);

        // 3. Dar puntos al usuario (1 USD = 10 Puntos)
        UsuarioPuntos up = usuarioPuntosRepo.findById(usuarioId)
                .orElse(new UsuarioPuntos(usuarioId, 0));
        
        int puntosNuevos = monto.intValue();
        up.setPuntos(up.getPuntos() + puntosNuevos);
        usuarioPuntosRepo.save(up);

        // 4. Guardar el registro de la donación
        Donacion donacion = new Donacion();
        donacion.setMonto(monto);
        donacion.setUsuarioId(usuarioId);
        donacion.setCampania(campania);
        donacionRepo.save(donacion);
    }
    
    public Integer obtenerPuntos(String usuarioId) {
        return usuarioPuntosRepo.findById(usuarioId)
                .map(UsuarioPuntos::getPuntos)
                .orElse(0);
    }
}
