import http from "k6/http";
import { group } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(90)<290"],
    group_duration: ["p(90)<240"],
    "group_duration{group:::Main Page}": ["p(90)<240"],
    "group_duration{group:::Main Page::Static assets}": ["p(90)<240"],
  },
};

export default function () {
  group("Main Page", function () {
    http.get("https://quickpizza.grafana.com/test.k6.io/");

    group("Static assets", () => {
      http.get("https://quickpizza.grafana.com/test.k6.io/static/css/site.css");
      http.get("https://quickpizza.grafana.com/test.k6.io/static/favicon.ico");
    });
  });

  group("Contacts page", function () {
    http.get("https://quickpizza.grafana.com/contacts.php");
    http.get("https://quickpizza.grafana.com/test.k6.io/static/favicon.ico");
  });
}
