import http from "k6/http";
import { sleep } from "k6";

export const options = {
//   vus: 100,
//   duration: "1m",
  stages:[
    {
        target: 100,
        duration: '30s'
    },
    {
        target: 100,
        duration: '5m'
    },
    {
        target: 0,
        duration: '30s'
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
