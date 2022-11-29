import Input.ReadFromFile;
import java.io.File;
import java.net.URL;
import java.util.List;

public class ProblemDos extends ReadFromFile {
    private long horizontal = 0;
    private long vertical = 0;
    private long aim = 0;

    public ProblemDos() {
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        /*
        List<String> numbers = seperatedByLine(fileName);
        System.out.println(prolemUno(numbers));
        System.out.println(problemDos(numbers));

         */
    }

    private long prolemUno(List<String> input){
        String[] directions;
        for(String elements : input){
            directions = elements.split(" ");
            int scalar = Integer.parseInt(directions[1]);
            if(directions[0].equals("forward")){
                horizontal+= scalar;
            }else if(directions[0].equals("up")){
                vertical -= scalar;
            }else{
                vertical += scalar;
            }
        }
        return horizontal * vertical;
    }
    private long problemDos(List<String> input){
        this.horizontal = 0;
        this.vertical = 0;
        String[] directions;
        for(String elements : input){
            directions = elements.split(" ");
            var scalar = Integer.parseInt(directions[1]);
            if(directions[0].equals("forward")){
                horizontal += scalar;
                vertical += (this.aim * scalar);
            }else if(directions[0].equals("up")){
                this.aim -= scalar;
            }else{
                this.aim += scalar;
            }
        }
        return horizontal * vertical;
    }
}
