package com.donaccion.testing;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;

@Component
public class DBTest implements CommandLineRunner {
    private final DataSource dataSource;

    public DBTest(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Conectado a: " + dataSource.getConnection().getMetaData().getURL());
    }
}
