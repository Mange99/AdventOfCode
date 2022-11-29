package problem3;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.List;

public class main extends ReadFromFile {
    private List<String> structure;
    private final URL url = getClass().getResource("input.txt");
    private final File fileName = new File(url.getPath());
    private char tree = '#';

    public main(){
        structure = seperatedByLine(fileName);
        slope(1,3);

        int first = slope(1,1);
        int second = slope(1,3);
        int third = slope(1, 5);
        int fourth = slope(1, 7);
        int fith = slope(2,1);

        System.out.println(first*second*third*fourth*fith);

    }
    private int slope(int down, int right) {
        int row = 0;
        int col = 0;
        int trees = 0;
        while (row < structure.size() - down) {
            if (col > 30) {
                col -= 31;
            }
            if (structure.get(row).charAt(col) == tree) {
                trees++;
            }
            row += down;
            col += right;
        }
        System.out.println(trees);
        return trees;
    }
    public static void main(String[] args) {
        new main();
    }
}
