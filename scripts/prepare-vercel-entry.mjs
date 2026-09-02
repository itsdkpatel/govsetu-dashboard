import { readFileSync, writeFileSync } from "node:fs";

const hex = readFileSync(
  "artifacts/govstart-setu-dashboard/dashboard-entry.hex",
  "utf8",
).replace(/\s/g, "");

writeFileSync(
  "artifacts/govstart-setu-dashboard/index.html",
  Buffer.from(hex, "hex"),
);