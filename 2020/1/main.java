package problem1;


import Input.ReadFromFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.URL;
import java.util.*;

//test
public class main extends ReadFromFile{
    private List<Integer> numbers;
    URL url = getClass().getResource("input.txt");
    File fileName = new File(url.getPath());
/*
    public main() {
        numbers = seperatedByLine(fileName);
        twoNumbers();
        threeNumbers();

    }
    public void twoNumbers(){
        for(int i = 0; i < numbers.size(); i++){
            for(int j = 0; j < numbers.size(); j++){
                if(i != j && numbers.get(i) + numbers.get(j) == 2020){
                    System.out.println(numbers.get(i) * numbers.get(j));
                }
            }
        }
    }
    public void threeNumbers(){
        for(int i = 0; i < numbers.size(); i++){
            for(int j = 1; j < numbers.size(); j++){
                for(int n = 2; n < numbers.size(); n++){
                    if(numbers.get(i) + numbers.get(j) + numbers.get(n) == 2020 && i != j && i != n){
                        System.out.println(numbers.get(i) * numbers.get(j) * numbers.get(n));
                    }
                }
            }
        }
    }


 */

    public static void main(String[] args) throws FileNotFoundException {
        new main();
    }
}
