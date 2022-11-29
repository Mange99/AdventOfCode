import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ProblemUno extends ReadFromFile {

    public ProblemUno() {
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());

        //List<Integer> numbers = seperatedByLine(fileName);
        //System.out.println(increased(numbers));

        //System.out.println(increasedByThree(numbers));
    }

    private int increased(List<Integer> list){
        int inc = 0;
        for(int i = 1; i < list.size(); i++){
            if(list.get(i) - list.get(i-1) > 0){
                inc++;
            }
        }
        return inc;
    }
    private int increasedByThree(List<Integer> list){
        List<Integer> temp = new ArrayList<>();

        for(int i = 0; i < list.size()-2; i++){
            temp.add(list.get(i) + list.get(i+1) + list.get(i+2));
        }
        return increased(temp);
    }
}