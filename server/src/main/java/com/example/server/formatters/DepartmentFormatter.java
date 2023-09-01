package com.example.server.formatters;

import com.example.server.pojos.Departments;
import com.example.server.pojos.Majors;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class DepartmentFormatter implements Formatter<Departments> {

    @Override
    public String print(Departments d, Locale locale) {
        return String.valueOf(d.getId());
    }

    @Override
    public Departments parse(String departmentId, Locale locale) throws ParseException {
        Integer id = Integer.parseInt(departmentId);
        return new Departments(id);
    }

}
