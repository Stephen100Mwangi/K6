// Init Stage - Low level
// 1. Import modules
// 2. Define options variable
// 3. Load files from local file system
// - Does not have a function
// - Executed once per virtual user

import http from "k6/http";

// Setup stage
export function setup() {
  console.log(`
        1. Sends HTTP  requests to fetch data.
        2. Nothing happens until setup stage is done
        3. Called once per test execution
        4. Data captured in this stage is passed to the Vu stage
        `);
}

// VU stage
export default function (data) {
  http.get("https://k6.io");
}

// Teardown - cleanup
// Run once per test execution
export function teardown(data) {}
