package problem10;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.*;

public class Main extends ReadFromFile {
    private final URL url = getClass().getResource("input.txt");
    private final File fileName = new File(url.getPath());
    private List<Integer> numbers = new ArrayList<>();
    private List<Integer> rearange;

    public Main(){
        readInput();
        //del A
        int differences = 0;
        int jolts = 0;
        for(int i = 0; i < numbers.size()-1; i++){
            if(numbers.get(i+1)-numbers.get(i) == 1) {
                differences++;
            }else if(numbers.get(i+1) - numbers.get(i) == 3){
                jolts++;
            }else{
                System.out.println(numbers.get(i+1) - numbers.get(i));
            }
        }
        System.out.println(jolts);
        System.out.println(differences);
        System.out.println(jolts * differences);

        //del B


    }
    public void readInput(){
        List<String> dummy;
        dummy = seperatedByLine(fileName);
        for (String s : dummy) {
            numbers.add(Integer.parseInt(s));
        }
        numbers.add(0,0);
        int max = Integer.MIN_VALUE;

        for(int i = 0; i < numbers.size(); i++){
            if(numbers.get(i) > max){
                max = numbers.get(i);
            }
        }
        int addMax = max + 3;
        System.out.println(addMax);
        numbers.add(addMax);
        Collections.sort(numbers);
        System.out.println(numbers);
    }

    public static void main(String[] args) {
        new Main();
    }


}
