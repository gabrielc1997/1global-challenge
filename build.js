require("dotenv").config();
const { execSync } = require("child_process");

const skipLint = process.env.NEXT_SKIP_BUILD_LINT === "true";

const args = [];

if (skipLint) args.push("--no-lint");

const command = `npx next build ${args.join(" ")}`;
console.log(`Running: ${command}`);
execSync(command, { stdio: "inherit" });
