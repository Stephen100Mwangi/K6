import { check } from "k6";
import http from "k6/http";

export default function () {
  http.get("http://localhost:8000/");
  http.get("http://localhost:8000/public/crocodiles/");
  let res = http.get("http://localhost:8000/public/crocodiles/2");
  //  {"id":2,"name":"Ed","sex":"M","date_of_birth":"1995-02-27","age":30}
  check(res, {
    Status200: (r) => r.status === 200,
    "Crocodile Is Ed": (r) => r.body.includes("Ed"),
    "Crocodile is Ed(PARSED)": (r) => r.json().name === "Ed", // Parsed
  });

  // Correlating requests - Handle dynamic data
  const response = http.get("http://localhost:8000/public/crocodiles/");
  const data = response.json();

  const crocodileId = data[0].id;
  const crocodileName = data[0].name;
  const crocodile1 = http.get(
    `http://localhost:8000/public/crocodiles/${crocodileId}`
  );

  check(crocodile1, {
    "Crocodile name": (r) => r.json().name === crocodileName,
  });

  // Accessing response headers
  const allowHeader = crocodile1.headers.Allow;
  console.log(allowHeader);
  const contentType = crocodile1.headers["Content-Type"]; // To handle headers whose names contain special characters e.g. -,_ Use bracket notation
  console.log(contentType);

  // Making a POST request
  const body = JSON.stringify({
    username: "test" + Date.now(),
    password: "12345678",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log("Creating user 🔃🔃");

  const res2 = http.post("http://localhost:8000/user/register/", body, params);
  console.log(res2);

  console.log("User created");

  // Assignment
  //   1. Generate an access token and print it
  const tokenBody = JSON.stringify({
    username: "john.doe@gmail.com",
    password: "12345678",
  });
  const tokenResponse = http.post(
    "http://localhost:8000/auth/token/login/",
    tokenBody,
    params
  );
  console.log(tokenResponse);
  const accessToken = tokenResponse.json().access;
  console.log("Access token" + accessToken);

  // Token-based documentation
  // Get data
  const tokenBasedResponse = http.get("http://localhost:8000/my/crocodiles/", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  console.log(tokenBasedResponse);

  // Post data
  const myCrocodile = JSON.stringify({
    name: "My Random Crocodile",
    sex: "M",
    date_of_birth: "1900-12-12",
  });
  const createPrivateCrocodile = http.post(
    "http://localhost:8000/my/crocodiles/",
    myCrocodile,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("⭐⭐⭐");
  console.log(createPrivateCrocodile);

  // Retrieve a crocodile ID
  const newCrocodileId = 9;
  const latestCrocodile = http.get(
    `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
    { headers: { Authorization: "Bearer " + accessToken } }
  );
  console.log(latestCrocodile);

  check(latestCrocodile, {
    "GET Latest Crocodile Status200": (r) => r.status === 200,
    "Latest Crocodile name": (r) => r.json().name === "My Random Crocodile",
  });

  // Update data
  const myNewCrocodile = JSON.stringify({
    name: "My Random Crocodile 2",
    // sex: "M",
    // date_of_birth: "1900-12-12",
  });
  const res3 = http.put(
    `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
    myNewCrocodile,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  console.log(res3);

  http.patch(URL,body,params);
  http.del(URL,null,params) // Null is for the request body although this is discouraged
}
