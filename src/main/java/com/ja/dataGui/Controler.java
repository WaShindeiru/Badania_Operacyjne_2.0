package com.ja.dataGui;

import com.ja.model.part.FactoryImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controler {

    FactoryImpl factory;

    public Controler() {
        factory = new FactoryImpl();
    }

    @GetMapping("/test")
    public String one(@RequestBody FactoryDetails temp) {
        System.out.println(temp);
        return "Kurwa";
    }
}
