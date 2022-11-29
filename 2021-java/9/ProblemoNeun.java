package problemoNeun;

import Input.ReadFromFile;

import java.io.File;
import java.net.URL;
import java.util.List;

public class ProblemoNeun extends ReadFromFile {

    public ProblemoNeun(){
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        List<String> input = seperatedByLine(fileName);

        int[]  arr = new int[input.get(0).length() * input.size()];

        int temp = 0;
        for(String a : input){
            for(int i = 0; i < a.length(); i++){
               arr[temp] = Integer.parseInt(String.valueOf(a.charAt(i)));
                temp++;
            }
        }

        int[][] area = to2d(arr, input.size(), input.get(0).length());
        int sum = 0;

        for(int i = 0; i < area.length; i++){
            for(int j = 0; j < area[0].length; j++){
                if(isLowPoint(area, i, j)){
                    sum += area[i][j] + 1;
                }
            }
        }
        System.out.println(sum);
    }
    private boolean isLowPoint(int[][] map, int row, int col) {
        int height = map[row][col];
        if (row > 0 && map[row - 1][col] <= height) {
            return false;
        }
        if (row < map.length - 1 && map[row + 1][col] <= height) {
            return false;
        }
        if (col > 0 && map[row][col - 1] <= height) {
            return false;
        }
        if (col < map[0].length - 1 && map[row][col + 1] <= height) {
            return false;
        }
        return true;
    }

    public int[][] to2d(int[] array, int rows, int cols) {
        int[][] arr = new int[rows][cols];
        for (int i = 0; i < rows; i++)
            System.arraycopy(array, (i*cols), arr[i], 0, cols);
        return arr;
    }
}
