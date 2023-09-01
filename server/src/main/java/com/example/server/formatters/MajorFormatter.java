package com.example.server.formatters;

import com.example.server.pojos.Majors;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class MajorFormatter implements Formatter<Majors> {

    @Override
    public String print(Majors m, Locale locale) {
        return String.valueOf(m.getId());
    }

    @Override
    public Majors parse(String majorId, Locale locale) throws ParseException {
        Long id = Long.parseLong(majorId);
        return new Majors(id);
    }

}
