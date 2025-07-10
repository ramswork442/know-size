#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import prettyBytes from "pretty-bytes";

const targetDir = process.argv[2] || ".";
const LARGE_FILE_THRESHOLD = 100 * 1024;

// Ignore folders that are typically noisy --
const IGNORED_FOLDERS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  ".cache",
  "coverage",
  "out"
]);

// Returns total size of all files inside folder (using recursion) --
function getFolderSize(dirPath) {
  let total = 0;
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
      total += stats.size;
    } else if (stats.isDirectory() && !IGNORED_FOLDERS.has(item)) {
      total += getFolderSize(fullPath);
    }
  }

  return total;
}

// main function --
function printSizes(currentPath, level = 0) {
  const indent = "    ".repeat(level);
  const folderName = path.basename(currentPath);

  try {
    const files = fs.readdirSync(currentPath);

    // Get total folder size
    const totalSize = prettyBytes(getFolderSize(currentPath));
    console.log(`${indent}${chalk.cyan(`📁 ${folderName}/`)} ${chalk.yellow(`(Total: ${totalSize})`)}`);

    files.forEach((file) => {
      const fullPath = path.join(currentPath, file);
      let stats;
      try {
        stats = fs.statSync(fullPath);
      } catch (err) {
        console.log(`${indent}├── ${chalk.yellow(file)} - ${chalk.red("Error accessing")}`);
        return;
      }

      if (stats.isFile()) {
        const size = prettyBytes(stats.size);
        let output = `${indent}├── ${file} - ${chalk.green(size)}`;
        if (stats.size > LARGE_FILE_THRESHOLD) {
          output += ` ${chalk.red.bold(" ⚠️ ", "LARGE ")}`;
        }
        console.log(output);
      } else if (stats.isDirectory()) {
        if (IGNORED_FOLDERS.has(file)) {
            console.log(`${indent}└── ${chalk.gray(file + "/")} - ${chalk.gray("Excluded (Skipped)")}`);
            return;
        }
        printSizes(fullPath, level + 1);
      }
    });
  } catch (err) {
    console.error(`${indent}${chalk.red(`Error reading "${currentPath}"`)}`);
    console.error(`${indent}${chalk.red(err.message)}`);
  }
}

printSizes(path.resolve(targetDir));
