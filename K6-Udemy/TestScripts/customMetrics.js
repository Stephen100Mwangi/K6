import { Counter, Trend } from "k6/metrics";
import http from "k6/http";
import { sleep } from "k6";

let myCounter = new Counter("customIterations");
let myTiming = new Trend("customResponseTiming");
export const options = {
  vus: 10,
  duration: "2m",
  thresholds: {
    customIterations: ["count>200"],
    customResponseTiming: ['p(90)<100', 'p(95)<200'],
  },
};
export default function () {
  let response = http.get("https://quickpizza.grafana.com/test.k6.io/");
  myCounter.add(1);
  sleep(5);

  myTiming.add(response.timings.duration);
}
