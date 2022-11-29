import Input.ReadFromFile;
import java.io.File;
import java.net.URL;
import java.util.List;

public class ProblemoSexis extends ReadFromFile {
    long[] fishGroups;
    File fileName;
    public ProblemoSexis() {
        URL url = getClass().getResource("input.txt");
        fileName = new File(url.getPath());
        List<Integer> timerValues = seperatedByComma(fileName);

        fishGroups = new long[9];
        for (int timer : timerValues) {
            fishGroups[timer]++;
        }

        System.out.println(losSolvos(80, fishGroups.clone()));
        System.out.println(losSolvos(256, fishGroups.clone()));
    }

    private long losSolvos(int turns, long[] fishGroups) {
        for (int i = 0; i < turns; i++) {
            turn(fishGroups);
        }
        return total(fishGroups);
    }

    private void turn(long[] fishGroups) {
        long temp = fishGroups[0];
        System.arraycopy(fishGroups, 1, fishGroups, 0, fishGroups.length - 1);
        fishGroups[6] += temp;
        fishGroups[8] = temp;
    }

    private long total(long[] fishGroups) {
        long sum = 0;
        for (long fishAmount : fishGroups) {
            sum += fishAmount;
        }
        return sum;
    }
}
