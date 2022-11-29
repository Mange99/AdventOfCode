import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ProblemQuattro extends ReadFromFile {
    private ArrayList<ArrayList<String>> bingoBoards;
    private String[] drawn;
    private ArrayList<String> temp;

    public ProblemQuattro() {
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        /*
        List<String> input = seperatedByLine(fileName);

        bingoBoards = new ArrayList<>();
        drawn = input.get(0).split(",");
        input.remove(0);
        input.remove(0);

        System.out.println(losProblemos(input, true));
        System.out.println(losProblemos(input, false));

         */
    }

    private int losProblemos(List<String> input, boolean winner) {
        temp = new ArrayList<>();

        for (String value : input) {
            if (value.equals("")) {
                bingoBoards.add(temp);
                temp = new ArrayList<>();
            }

            String[] numbers = value.split(" ");

            for (String number : numbers) {
                if (!number.equals("")) {
                    temp.add(number);
                }
            }
        }

        String current;
        for (String value : drawn) {
            current = value;
            for (int j = 0; j < bingoBoards.size(); j++) {
                if (bingoBoards.get(j).contains(value)) {
                    Collections.replaceAll(bingoBoards.get(j), value, "x");
                }
                if (checkBingo(bingoBoards.get(j)) && winner) {
                    Collections.replaceAll(bingoBoards.get(j), "x", "0");
                    int sum = 0;
                    for (String s : bingoBoards.get(j)) {
                        sum += Integer.parseInt(s);
                    }
                    return Integer.parseInt(current) * sum;
                }else if(checkBingo(bingoBoards.get(j)) && !winner && bingoBoards.size() == 1){
                    Collections.replaceAll(bingoBoards.get(j), "x", "0");
                    int sum = 0;
                    for (String s : bingoBoards.get(j)) {
                        sum += Integer.parseInt(s);
                    }
                    return Integer.parseInt(current) * sum;
                }else if(checkBingo(bingoBoards.get(j)) && !winner){
                    bingoBoards.remove(bingoBoards.get(j));
                    j--;
                }
            }
        }
        return -1;
    }

    private boolean checkBingo(ArrayList<String> input){
        int valid = 0;
        for(int i = 0; i < input.size();i+=5){
            for(int j = 0; j < 5; j++){
                if(input.get(i+j).equals("x")){
                    valid++;
                    if(valid == 5){
                        return true;
                    }
                }
            }
            valid = 0;
        }
        valid = 0;
        for (int i = 0; i < 5; i++) {
            for(int j = 0; j < 25; j+=5){
                if (input.get(i+j).equals("x")) {
                    valid++;
                    if (valid == 5) {
                        return true;
                    }
                }
            }
            valid = 0;
        }
        return false;
    }
}
