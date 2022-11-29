package problem8;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class Main extends ReadFromFile {
    private final URL url = getClass().getResource("input.txt");
    private final File fileName = new File(url.getPath());
    private List<String> executions;

    public Main(){
        executions = seperatedByLine(fileName);
        System.out.println(executions);
        int sum = execute(executions);
        System.out.println(sum);
        boolean terminated = false;

        while(!terminated){
            List<String> copy = new ArrayList<>(executions);
            for(int i = 0; i < copy.size(); i++){
                if(copy.get(i).startsWith("nop")){
                    copy.remove(i);
                    copy.add(i, "jmp" + copy.get(i).substring(3));
                    sum = execute(copy);
                    if(sum > 0){
                        terminated = true;
                        break;
                    }
                }else if(copy.get(i).startsWith("jmp")){
                    copy.remove(i);
                    copy.add(i, "nop" + copy.get(i).substring(3));
                    sum = execute(copy);
                    if(sum > 0){
                        terminated = true;
                        break;

                    }
                }
                copy = new ArrayList<>(executions);
            }
        }
        System.out.println(sum);
    }

    public int execute(List<String> exec){
        int accimulator = 0;
        List<Integer> linesOfExecute = new ArrayList<>();
        linesOfExecute.add(Integer.MIN_VALUE);
        for(int i = 0; i < exec.size(); i++){
            for(int j = 0; j < linesOfExecute.size(); j++){
                if(linesOfExecute.contains(i)){
                    return 0;
                }
            }
            linesOfExecute.add(i);

            String code = exec.get(i).substring(0,3);
            String operator = exec.get(i).substring(4,5);
            int number = Integer.parseInt(exec.get(i).substring(5));

            if(code.equals("nop")){
                continue;
            }else if(code.equals("acc") && operator.equals("+")){
                accimulator += number;
            }else if(code.equals("acc") && operator.equals("-")){
                accimulator -= number;
            }else if(code.equals("jmp") && operator.equals("+")){
                i += number-1;
            }else{
                i -= number+1;
            }
            if(i == exec.size()-1){
                return accimulator;
            }
        }

        return 0;
    }

    public static void main(String[] args) {
        new Main();
    }
}
