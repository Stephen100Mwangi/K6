import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 5,
  duration: "20s",
  thresholds: {
    http_req_duration: ["p(95)<300"],
    "http_req_duration{status:200}": ["p(95)<200"],
    "http_req_duration{status:201}": ["p(95)<200"],
  },
};

export default function () {
  let res = http.get("https://furniture.free.beeceptor.com/"); // 200
  console.log(res.status);

  sleep(2);
  let res2 = http.get("https://furniture.free.beeceptor.com/api/dummy-data"); // 201
  console.log(res2.status);
}
