import { readFileSync, writeFileSync } from "node:fs";

const hex = readFileSync("dashboard-entry.hex", "utf8").replace(/\s/g, "");
writeFileSync("index.html", Buffer.from(hex, "hex"));