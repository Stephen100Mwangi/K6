// Extended load test
import http from "k6/http";
import { sleep } from "k6";

export const options = {
//   vus: 100,
//   duration: "1m",
  stages:[
    {
        target: 1000,
        duration: '30m'
    },
    {
        target: 1000,
        duration: '24h'
    },
    {
        target: 0,
        duration: '25m'
    }
  ]
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(2);
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}
