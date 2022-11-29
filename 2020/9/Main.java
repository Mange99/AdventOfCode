package problem9;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class Main extends ReadFromFile {
    private final URL url = getClass().getResource("input.txt");
    private final File fileName = new File(url.getPath());
    private List<String> numbers;
    private List<Long> badNums;
    public Main(){
        numbers = seperatedByLine(fileName);

        badNums = new ArrayList<>();
        for(int i = 0; i <numbers.size(); i++){
            badNums.add(Long.parseLong(numbers.get(i)));
        }
        System.out.println(badNums);

        long anwser = goodNumbers(badNums);
        System.out.println(anwser);

        long sum = smallBigNumber(anwser);
        System.out.println(sum);
    }
    public long smallBigNumber(long falseNumber){
        for(int i = 0; i < numbers.size()/2; i++){

        }
        return 2;
    }
    public Long goodNumbers(List<Long> numbers){
        long falseNumber = -1;
        //List<Long> falseNumbers = new ArrayList<>();
        List<Long> goodNumbers = new ArrayList<>();
        for(int i = 0; i < 25; i++){
            goodNumbers.add(numbers.get(i));
        }
        System.out.println(goodNumbers);
        for(int i = 25; i < numbers.size(); i++){
            for(int j = i-25; j < i; j++){
                for(int k = j+1; k < i; k++){
                   if(numbers.get(k) + numbers.get(j) == numbers.get(i)){
                        goodNumbers.add(numbers.get(i));
                        break;
                    }
                }
            }
            if(!goodNumbers.get(goodNumbers.size()-1).equals(numbers.get(i))){
                falseNumber = (numbers.get(i));
            }
        }
        return falseNumber;
    }

    public static void main(String[] args) {
        new Main();
    }

}
