import { check, sleep } from "k6";
import http from "k6/http";

export default function () {
  const response = http.get("https://quickpizza.grafana.com/test.k6.io/");
  check(response, {
    'status200': (res) => res.status === 200 
  });

  check(response,{
    'Page is index page': (res) => res.body.includes('QuickPizza Legacy')
  })
  sleep(1);
}
