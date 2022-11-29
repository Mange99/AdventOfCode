import Input.ReadFromFile;
import java.io.File;
import java.net.URL;
import java.util.List;

public class ProblemoSju extends ReadFromFile {

    public ProblemoSju(){
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        List<Integer> input = seperatedByComma(fileName);

        System.out.println(losSolvos(input, true));
        System.out.println(losSolvos(input, false));
    }
    private int losSolvos(List<Integer> input, boolean part1){
        int least = Integer.MAX_VALUE;
        for(int i = 0; i < 10000; i++){
            if(fuel(input, i, part1) < least){
                least = fuel(input, i, part1);
            }else{
                return least;
            }
        }
        return least;
    }

    private int fuel(List<Integer> integers, int target, boolean a){
        int sum = 0;
        for (int i = 0; i < integers.size(); i++) {
            if(a){
                sum += Math.abs(integers.get(i) - target);
            }else{
                sum += sum(Math.abs(integers.get(i) - target));
            }
        }
        return sum;
    }

    private int sum(int x){
        return x * (x+1)/2;
    }
}