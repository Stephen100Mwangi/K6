import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    {
      target: 100000,
      duration: "2h",
    },
  ],
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(2);
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}
