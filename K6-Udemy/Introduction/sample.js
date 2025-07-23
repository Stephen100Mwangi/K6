import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
    vus: 100,
    // iterations: 500,

    stages: [
        {"duration":'30s', target: 100},
        {"duration":'2m', target: 100},
        {"duration":'5m', target: 10000}
    ]
}

export default function (){
    http.get('https://geoborders.onrender.com/')
    sleep(2);
}