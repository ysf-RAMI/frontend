import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively list files and folders
function listFiles(dir, indent = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (file === "node_modules") return; // Skip node_modules

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${file}`);
      listFiles(filePath, indent + "  "); // Recursively list subdirectories
    } else {
      console.log(`${indent}📄 ${file}`);
    }
  });
}

// Start listing from the current directory
const projectRoot = path.resolve(__dirname);
console.log(`Project Structure for: ${projectRoot}`);
listFiles(projectRoot);
