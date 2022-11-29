package problem4;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class main extends ReadFromFile{
    private List<String> structure;
    private final URL url = getClass().getResource("input.txt");
    private final File fileName = new File(url.getPath());
    private String[] ids = {"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"};
    private String[] color = {"amb", "blu", "brn", "gry", "grn", "hzl", "oth"};
    private int valid = 0;

    public main() {
        structure = seperatedByLine(fileName);

        for(String passwords : structure){
            checkIdPassernger(passwords);
        }
        System.out.println(valid);
    }
    public void checkIdPassernger(String passenger){
        String[] splitted = passenger.split("\\s+");
        boolean validPassport = true;
        int tot = 0;

        for(String id : splitted){
            for(int i = 0; i < ids.length; i++){
                if(id.contains(ids[i])){
                    tot++;
                }
                String answer = id.substring(id.indexOf(":")+1);
                if(id.contains(ids[0])){
                    //byr
                    int year = Integer.parseInt(answer);
                    if(year < 1920 || year > 2002 && answer.length() == 4){
                        validPassport = false;
                        System.out.println("FALSE 1");
                        break;
                    }
                }else if (id.contains(ids[1])) {
                    //iyr
                    int year = Integer.parseInt(answer);
                    if (year < 2010 || year > 2020 && answer.length() == 4) {
                        validPassport = false;
                        System.out.println("FALSE 2");

                        break;
                    }
                }else if(id.contains(ids[2])) {
                    //eyr
                    int year = Integer.parseInt(answer);
                    if (year < 2020 || year > 2030 && answer.length() == 4) {
                        validPassport = false;
                        System.out.println("FALSE 3");
                        break;
                    }
                }else if(id.contains(ids[3])){
                    //hgt
                    String unit = id.substring(id.length() - 2);
                    if(!unit.equals("cm") && !unit.equals("in")) {
                        validPassport = false;
                        System.out.println("FALSE 4");
                        break;
                    }
                    String number = id.substring(id.indexOf(":")+1, id.length()-2);
                    char[] numbers = number.toCharArray();
                    for(int j = 0; j < number.length(); j++) {
                        if (!Character.isDigit(numbers[j])) {
                            System.out.println("FALSE 4");
                            validPassport = false;
                            break;
                        }
                    }
                    System.out.println(unit);
                    int height = Integer.parseInt(number);
                    if(unit.equals("cm") && height >= 150 && height <= 193){
                        validPassport = true;
                        System.out.println(unit + " " + height);
                    }else if(unit.equals("in") && height >= 59 && height <= 76){
                        validPassport = true;
                        System.out.println(unit + " " + height);
                    }else{
                        validPassport = false;
                        break;
                    }

                }else if(id.contains(ids[4])) {
                    //hcl
                    if(answer.charAt(0) != '#'){
                        validPassport = false;
                        System.out.println("FALSE 5");

                        break;
                    }
                    String numbers = answer.substring(1);
                    if(numbers.length() != 6){
                        validPassport = false;
                        System.out.println("FALSE 5");

                        break;
                    }
                }else if(id.contains(ids[5])){
                    //ecl
                    boolean validColor = false;
                    for(int n = 0; n < color.length; n++){
                        if(color[n].equals(answer)){
                            validColor = true;
                            break;
                        }
                    }
                    if(!validColor){
                        validPassport = false;
                        System.out.println("FALSE 6");

                        break;
                    }
                }else if(id.contains(ids[6])){
                    //pid
                    if(!isNumeric(answer) || answer.length() != 9){
                        validPassport = false;
                        System.out.println("FALSE 7");

                        break;
                    }
                }
            }
        }
        if(validPassport && tot == 7){
            valid++;
        }else{
            System.out.println(passenger);
        }
    }
    public static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        try {
            double d = Double.parseDouble(strNum);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }
    public static void main(String[] args) {
        new main();
    }
}


