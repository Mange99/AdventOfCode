import java.io.File;
import java.net.URL;
import java.util.List;

import Input.ReadFromFile;

public class ProblemTres extends ReadFromFile {

    public ProblemTres(){
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        /*
        List<String> input = seperatedByLine(fileName);

        int oxygen = problemDos(input, true);
        input = seperatedByLine(fileName);
        int co2 = problemDos(input, false);

        System.out.println(problemUno(input));
        System.out.println(oxygen * co2);

         */
    }

    private int problemDos(List<String> input, boolean most) {
        for (int i = 0; input.size() > 1 && i < input.get(0).length(); i++) {
            int one = 0;
            int zero = 0;
            for (String s : input) {
                if (s.charAt(i) == '0') {
                    zero++;
                } else {
                    one++;
                }
            }

            for (int j = 0; j < input.size(); j++) {
                if (most) {
                    if ((one >= zero && input.get(j).charAt(i) == '0') || (one < zero && input.get(j).charAt(i) == '1')) {
                        input.remove(j);
                        j--;
                    }
                } else {
                    if ((one < zero && input.get(j).charAt(i) == '0') || (one >= zero && input.get(j).charAt(i) == '1')) {
                        input.remove(j);
                        j--;
                    }
                }
            }
        }
        return Integer.parseInt(input.get(0), 2);
    }

    private int problemUno(List<String> input){
        int zero = 0;
        int one = 0;
        StringBuilder str = new StringBuilder();
        StringBuilder least = new StringBuilder();

        for(int i = 0; i < input.get(i).length(); i++){
            for (String s : input) {
                if (s.charAt(i) == '0') {
                    zero++;
                } else {
                    one++;
                }
            }
            if(zero < one){
                least.append('0');
                str.append("1");
            }else{
                least.append('1');
                str.append('0');
            }
            zero = 0;
            one = 0;
        }
        int gamma =Integer.parseInt(str.toString(),2);
        int epsilon =Integer.parseInt(least.toString(),2);
        return (gamma * epsilon);

    }
}
