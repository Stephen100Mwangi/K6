import { sleep } from "k6";
import http from "k6/http";

export const options = {
    vus: 1000,
    duration: '2m',

}
// Spike - Sudden change in traffic
// Load - Multiple users accessing the system concurrently(at the same time)
// Stress - How much to hold before snap
// Smoke - 
export default function(){
    http.get("https://quickpizza.grafana.com/test.k6.io/");
    sleep(2);
    http.get('https://quickpizza.grafana.com/contacts.php');
    sleep(2);
    http.get('https://quickpizza.grafana.com/news.php');
    sleep(2);
}
