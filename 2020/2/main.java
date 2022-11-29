package problem2;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.List;

public class main extends ReadFromFile{
    //test
    private List<String> numbers;
    private URL url = getClass().getResource("input.txt");
    private File fileName = new File(url.getPath());
    private int tot = 0;

    public main(){
        numbers = seperatedByLine(fileName);
        validPasswords();
        validPasswordsElite();
    }
    public void validPasswordsElite(){
        int valid = 0;
        for(int i = 0; i < numbers.size(); i++){
            tot = 0;
            int dash = numbers.get(i).indexOf('-');
            int first = Integer.parseInt(numbers.get(i).substring(0, dash));
            first -= 1;
            int space = numbers.get(i).indexOf(' ');
            int second = Integer.parseInt(numbers.get(i).substring(dash+1, space));
            second -= 1;
            String target = numbers.get(i).substring(space+1, numbers.get(i).indexOf(':'));
            String blah = numbers.get(i).substring(numbers.get(i).lastIndexOf(" ")+1);

            char[] realPass = blah.toCharArray();
            if(target.equals(String.valueOf(realPass[first]))){
                tot++;
            }
            if(target.equals(String.valueOf(realPass[second]))){
                tot++;
            }
            if(tot == 1){
                valid += 1;
            }
        }
        System.out.println(valid);
    }
    public void validPasswords(){
        int valid = 0;
        for(int i = 0; i < numbers.size(); i++){
            tot = 0;
            int dash = numbers.get(i).indexOf('-');
            int least = Integer.parseInt(numbers.get(i).substring(0, dash));
            int space = numbers.get(i).indexOf(' ');
            int most = Integer.parseInt(numbers.get(i).substring(dash+1, space));
            String target = numbers.get(i).substring(space+1, numbers.get(i).indexOf(':'));
            String blah = numbers.get(i).substring(numbers.get(i).lastIndexOf(" ")+1);
            char[] realPass = blah.toCharArray();

            for(int j = 0; j < realPass.length; j++){
                if(target.equals(String.valueOf(realPass[j]))){
                    tot++;
                }
            }
            if(tot >= least && tot <= most){
                valid += 1;
            }
        }
        System.out.println(valid);
    }

    public static void main(String[] args) {
        new main();
    }
}
