package com.donaccion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.donaccion.model.Ping;

public interface PingRepository extends JpaRepository<Ping, Long> {}
