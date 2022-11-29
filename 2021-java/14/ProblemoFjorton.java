import static java.util.Map.Entry.comparingByValue;
import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

import java.io.File;
import java.net.URL;
import java.util.List;

import Input.ReadFromFile;

public class ProblemoFjorton extends ReadFromFile {
    String code = "";
    List<String> input;

    public ProblemoFjorton(){
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        input = seperatedByLine(fileName);

        code = input.get(0);
        input.remove(0);
        input.remove(0);
        System.out.println(code);
        for(int i = 0; i < 5; i++){
            problemoUno();
        }
        long max = code.chars()
                .mapToObj(x -> (char) x)
                .collect(groupingBy(x -> x, counting()))
                .entrySet().stream()
                .max(comparingByValue()).get().getValue();

        long min = code.chars()
                .mapToObj(x -> (char) x)
                .collect(groupingBy(x -> x, counting()))
                .entrySet().stream()
                .min(comparingByValue()).get().getValue();

        System.out.println(max-min);
    }

    private void problemoUno(){
        for(int i = 0; i < code.length()-1; i += 2) {
            StringBuilder sb = new StringBuilder();
            sb.append(code.charAt(i));
            sb.append(code.charAt(i+1));

            for(int j = 0; j < input.size(); j++){
                String between = input.get(j).substring(0, 2);
                String insert = input.get(j).substring(6);

                if(between.equals(sb.toString())){
                    code = code.substring(0, i+1) + insert + code.substring(i+1);
                }
            }
        }
        System.out.println(code);
    }
}
