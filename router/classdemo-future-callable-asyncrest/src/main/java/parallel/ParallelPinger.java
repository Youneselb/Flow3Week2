package parallel;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import sequental.SequentialPinger;

//Perhaps this you go into a separate file
class PingURL implements Callable<String> {
  String url;
  PingURL(String url) {this.url = url; 
    this.url = url;
  }
  @Override
  public String call() throws Exception {
    return "SequentialPinger.getstatus(url)";
  }
}

public class ParallelPinger {
  
    /*
    Create and executor service
    Get the list of URLs to contact from the static method in SequentalPinger
    Make a List of <Future<String>>
    Create your Callables, and start them via a method on the executor and add the returned future to the list
    Call a "relevant" method on all your futures to get the response, and to the List you eventually will return
    */
  public static List<String> getStatusFromAllServers() throws Exception{
      String[] hostList = SequentialPinger.getHostList();
      List<Future<String>> futureList = new ArrayList<>();
      List<String> result = new ArrayList<>();
      ExecutorService executor = Executors.newFixedThreadPool(hostList.length);     
      
      for (String url : hostList) {
          Callable<String> pinger = new PingURL(url); 
          Future future = executor.submit(pinger);
          futureList.add(future);
      }
      
      for (Future<String> future: futureList) {
          result.add(future.get());
      }
              
    return null;
  }

  public static void main(String[] args) throws Exception {
    long timeStart = System.nanoTime();
    List<String> results = getStatusFromAllServers();
    for(String r: results){
      System.out.println(r);
    }
    long timeEnd = System.nanoTime();
    long total = (timeEnd - timeStart) / 1_000_000;
    System.out.println("Time to check URLS: " + total + "ms.");
  }
}
