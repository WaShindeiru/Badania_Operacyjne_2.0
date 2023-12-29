package com.ja.dataGui;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class Temp {
    public String username;
    public String password;

    HashMap<Integer, String> people;

    public Temp() {};
}
