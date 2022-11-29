package problem6;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.*;

public class Main extends ReadFromFile {
    private List<String> totalAwnsers;
    private final URL url = getClass().getResource("input.txt");
    private final File fileName = new File(url.getPath());
    private List<List<String>> groups = new ArrayList<>();

    public Main(){
        /*
        totalAwnsers = seperatedByLine(fileName);
        int sumGroup = 0;
        sumGroup = first(totalAwnsers);
        System.out.println(sumGroup);
         */
        totalAwnsers = seperatedByLine(fileName);

        int sumPerGroup = 0;
        int spaceIndex = 0;
        int counterPersons = 0;

        System.out.println(totalAwnsers);

        for(String persons : totalAwnsers){
            if(persons.length() < 1){
                groups.add(totalAwnsers.subList(counterPersons, spaceIndex));
                counterPersons = spaceIndex+1;
            }
            spaceIndex++;
        }
        System.out.println(groups);
        int sum = 0;
        for(List<String> list : groups){
            List<String> trell = new ArrayList<>();
            char[] first = list.get(0).toCharArray();
            for(int i = 0; i < first.length; i++){
                trell.add(String.valueOf(first[i]));
            }
            sum += getDuplicates(list, trell);
        }
        System.out.println(sum);

    }
    public int getDuplicates(List<String> list, List<String> current){
        for(int i = 1; i < list.size(); i++){
            current = compare2Rows(current, list.get(i));
        }
        return current.size();
    }

    public List<String> compare2Rows(List<String> current, String next){
        List<String> duplicates = new ArrayList<>();
        char[] currentArr = new char[current.size()];
        for(int i = 0; i < current.size(); i++){
            currentArr[i] = current.get(i).charAt(0);
        }
        char[] nextArr = next.toCharArray();
        for(int i = 0; i < currentArr.length; i++){
            for(int j = 0; j < nextArr.length; j++){
                if(currentArr[i] == nextArr[j]){
                    duplicates.add(String.valueOf(currentArr[i]));
                    break;
                }
            }
        }
        return duplicates;
    }

    public int first(List<String> list){
        int sum = 0;
        for(String words : list){
            sum += removeDups(words).length();
        }
        return sum;
    }

    public static String removeDups(String word) {
        Set<Character> chars = new HashSet<>();
        StringBuilder output = new StringBuilder(word.length());
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (chars.add(ch)) {
                output.append(ch);
            }
        }
        return output.toString();
    }

   public static void main(String[] args) {
        new Main();
    }

}
