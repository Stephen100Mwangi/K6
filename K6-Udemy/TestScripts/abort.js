import http from "k6/http";
import exec from "k6/execution";

export default function () {
  const res = http.get("https://k6.io");
  if (res.error) {
    exec.test.abort("Error sending a request");
  }
}
