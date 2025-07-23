import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages:[
    {
        target: 10,
        duration: '10s'
    },
    {
        target: 1500,
        duration: '2m'
    },
    {
        target: 2,
        duration: '10s'
    },
    {
        target: 1000,
        duration: '1m'
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
