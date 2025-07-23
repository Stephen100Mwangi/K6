import { check, sleep } from "k6";
import http from "k6/http";
import exec from "k6/execution"

export const options ={
    vus: 10,
    duration: '40s',
    thresholds: {
        http_req_duration: ['p(95)<300'], // Trend
        http_req_duration: ['max<300'], // Trend
        http_req_failed: ['rate<0.01'], // Only allow 1% of the requests to fail
        http_reqs: ['count>100'], // Counter
        http_reqs: ['rate>10'], // Rate
        vus: ['value>9'] // Gauge

    }
}


export default function () {
  const response = http.get("https://quickpizza.grafana.com/test.k6.io/");
  console.log(exec.scenario.iterationInTest);
  
  check(response, {
    'status200': (res) => res.status === 200 
  });

  check(response,{
    'Page is index page': (res) => res.body.includes('QuickPizza Legacy')
  })
  sleep(1);
}
