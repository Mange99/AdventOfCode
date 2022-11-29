import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProblemoAcht extends ReadFromFile {

    public ProblemoAcht() {
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        List<String> input = seperatedByLine(fileName);
        List<String> test = new ArrayList<>();

        for(int i =0;  i<input.size(); i++){
            test.add(input.get(i).substring(0, 59) + input.get(i).substring(61));
        }

        String zero = "";
        String one = "";
        String two = "";
        String three = "";
        String four = "";
        String five = "";
        String six = "";
        String seven = "";
        String eight = "";
        String nine = "";
        int result = 0;

        StringBuilder sum = new StringBuilder();
        for(int x = 0; x < test.size(); x++){
            String[] temp = test.get(x).split(" ");

            for (int i = 0; i < temp.length; i++) {
                int ln = temp[i].length();
                if (ln == 2) {
                    one = temp[i];
                } else if (ln == 3) {
                    seven = temp[i];
                } else if (ln == 4) {
                    four = temp[i];
                } else if (ln == 7) {
                    eight = temp[i];
                }
            }

            for (int i = 0; i < temp.length; i++) {
                int ln = temp[i].length();
                if (ln == 6) {
                    if (!allInclude(temp[i], one)) {
                        six = temp[i];
                    } else if (allInclude(temp[i], four)) {
                        nine = temp[i];
                    } else {
                        zero = temp[i];
                    }
                }
            }
            for (int i = 0; i < temp.length; i++) {
                int ln = temp[i].length();
                if (ln == 5) {
                    if (allInclude(temp[i], one)) {
                        three = temp[i];
                    } else if (allInclude(six, temp[i])) {
                        five = temp[i];
                    } else {
                        two = temp[i];
                    }
                }
            }

            List<String> test1 = new ArrayList<>();
            test1.add(input.get(x).substring(61));


            for(int j = 0; j < test1.size(); j++) {
                String[] arr = test1.get(j).split(" ");

                System.out.println(Arrays.toString(arr));

                for (int i = 0; i < arr.length; i++) {
                    String wordish = arr[i];
                    if (equal(wordish, zero)) {
                        sum.append("0");
                    } else if (equal(wordish, one)) {
                        sum.append("1");
                    } else if (equal(wordish, two)) {
                        sum.append("2");
                    } else if (equal(wordish, three)) {
                        sum.append("3");
                    } else if (equal(wordish, four)) {
                        sum.append("4");
                    } else if (equal(wordish, five)) {
                        sum.append("5");
                    } else if (equal(wordish, six)) {
                        sum.append("6");
                    } else if (equal(wordish, seven)) {
                        sum.append("7");
                    } else if (equal(wordish, eight)) {
                        sum.append("8");
                    } else if (equal(wordish, nine)) {
                        sum.append("9");
                    }
                }
                if(!sum.isEmpty()){
                    result += Integer.parseInt(sum.toString());
                }
                sum = new StringBuilder();

            }
            System.out.print(result);
        }





    }
    private boolean equal(String s1, String s2){
        char[] c1 = s1.toCharArray();
        char[] c2 = s2.toCharArray();

        Arrays.sort(c1);
        Arrays.sort(c2);

        if(Arrays.equals(c1, c2)){
           return true;
        }

        return false;
    }
    private boolean allInclude(String search, String target){
        String[] v2 = target.split("");
        for(int i = 0; i < v2.length; i++){
            if(!search.contains(v2[i])){
                return false;
            }
        }
        return true;
    }
}