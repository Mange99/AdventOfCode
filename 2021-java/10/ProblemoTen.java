import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.*;

public class ProblemoTen extends ReadFromFile {
    private char current;
    private Deque<Character> stack;

    public ProblemoTen(){
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        List<String> input = seperatedByLine(fileName);

        System.out.println(part1(input));
        ArrayList<Long> part2 = part2(input);
        Collections.sort(part2);
        System.out.println(part2.get(part2.size()/2));
    }

    private ArrayList<Long> part2(List<String> strings){
        strings.removeIf(lines -> !corrupted(lines));
        ArrayList<Long> sum = new ArrayList<>();
        for(int i = 0; i < strings.size(); i++){
            if(corrupted(strings.get(i))){
                sum.add(0L);
                while(!stack.isEmpty()){
                    sum.set(i,sum.get(i)*5);
                    char current = stack.pop();
                    if(current == '(') {
                        sum.set(i,sum.get(i)+1);
                        strings.add(")");
                    }else if(current == ('{')){
                        sum.set(i,sum.get(i)+3);
                        strings.add("}");
                    }else if(current == '['){
                        sum.set(i,sum.get(i)+2);
                        strings.add("]");
                    }else if(current == '<'){
                        sum.set(i,sum.get(i)+4);
                        strings.add(">");
                    }
                }
            }
        }
        return sum;
    }
    private int part1(List<String> strings){
        int sum = 0;

        for(String word : strings){
            if(!corrupted(word)){
                if(current == ')'){
                    sum += 3;
                }else if(current == ']'){
                    sum += 57;
                }else if(current == '}'){
                    sum += 1197;
                }else if(current == '>'){
                    sum += 25137;
                }
            }
        }
        return sum;
    }
    private boolean corrupted(String word){
        stack = new ArrayDeque<Character>();

        for (int i = 0; i < word.length(); i++){
            current = word.charAt(i);

            if (current == '(' || current == '[' || current == '{' || current == '<'){
                stack.push(current);
                continue;
            }
            if (stack.isEmpty())
                return false;

            char check;
            if(current == ')') {
                check = stack.pop();
                if (check == '{' || check == '[' || check == '<')
                    return false;
            }else if(current == '}'){
                check = stack.pop();
                if (check == '(' || check == '[' || check == '<')
                    return false;
            }else if(current == ']'){
                check = stack.pop();
                if(check == '(' || check == '{' || check == '<'){
                    return false;
                }
            }else if(current == '>'){
                check = stack.pop();
                if(check == '(' || check == '{' || check == '['){
                    return false;
                }
            }
        }
        //return (stack.isEmpty());
        return true;
    }
}
