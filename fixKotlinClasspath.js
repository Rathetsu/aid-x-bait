import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gradleFilePath = path.join(__dirname, "android", "build.gradle");

// Read the file
let gradleContent = fs.readFileSync(gradleFilePath, "utf8");

// Define the regex pattern to find the unversioned classpath line
const pattern =
	/classpath\(['"]org\.jetbrains\.kotlin:kotlin-gradle-plugin['"]\)/;

// Define the replacement line
const replacement =
	'classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")';

// Replace the line if it matches
if (pattern.test(gradleContent)) {
	gradleContent = gradleContent.replace(pattern, replacement);
	fs.writeFileSync(gradleFilePath, gradleContent, "utf8");
	console.log("✅ Kotlin Gradle Plugin classpath line fixed.");
} else {
	console.log(
		"ℹ️ No matching classpath line found. Kotlin Gradle Plugin classpath might cause an error."
	);
}
