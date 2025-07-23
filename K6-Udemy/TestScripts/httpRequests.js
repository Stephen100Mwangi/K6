import { sleep } from "k6";
import http from "k6/http";

export default function () {
  const response = http.get("https://quickpizza.grafana.com/test.k6.io/");
  console.log(response);
  console.log(response.body);
  console.log(response.status);
  sleep(1);
}
