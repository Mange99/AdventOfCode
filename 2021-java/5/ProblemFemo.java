import Input.ReadFromFile;

import java.awt.*;
import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ProblemFemo extends ReadFromFile {

    public ProblemFemo(){
        URL url = getClass().getResource("input.txt");
        File fileName = new File(url.getPath());
        //List<String> input = seperatedByLine(fileName);

        //System.out.println(losSolvos(input, false)); //problemUno
        //System.out.println(losSolvos(input, true)); //problemDos
    }

    private int losSolvos(List<String> input, boolean vertical) {
        int[][] grid = new int[1000][1000];
        List<Point> points = new ArrayList<>();

        for (String lines : input) {
            String[] test = lines.split(" -> ");

            String[] point1 = test[0].split(",");
            String[] point2 = test[1].split(",");
            int x1 = Integer.parseInt(test[0].split(",")[0]);
            int x2 = Integer.parseInt(test[1].split(",")[0]);
            int y1 = Integer.parseInt(test[0].split(",")[1]);
            int y2 = Integer.parseInt(test[1].split(",")[1]);

            int minX = Math.min(x1, x2);
            int minY = Math.min(y1, y2);
            int inc = Math.max(Math.abs(x2-x1), Math.abs(y2-y1));

            if(x1 == x2 || y1 == y2){
                points.add(new Point(minX, minY));
            }else if(vertical){
                points.add(new Point(x1, y1));
            }
            for(int i = 0; i < inc; i++){
                if(x1 == x2){
                    points.add(new Point(minX,minY+1));
                    minY += 1;
                }else if(y1 == y2){
                    points.add(new Point(minX+1,minY));
                    minX += 1;
                } else if(vertical){
                    if(x1 > x2 && y2 > y1){
                        points.add(new Point(x1-1, y1+1));
                        x1 -= 1;
                        y1 += 1;
                    }else if(x1 > x2){
                        points.add(new Point(x1-1, y1-1));
                        x1 -= 1;
                        y1 -= 1;
                    }else if(y1 > y2){
                        points.add(new Point(x1+1, y1-1));
                        x1 += 1;
                        y1 -= 1;
                    }else {
                        points.add(new Point(x1+1, y1+1));
                        x1 += 1;
                        y1 += 1;
                    }
                }
            }
        }
        for(Point po : points){
            grid[(int)po.getY()][(int)po.getX()] += 1;
        }
        int over = 0;
        for (int[] ints : grid) {
            for (int j = 0; j < grid[0].length; j++) {
                if (ints[j] >= 2) {
                    over += 1;
                }
            }
        }
        return over;
    }
}