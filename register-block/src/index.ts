import * as core from "@actions/core";
import * as fs from "fs";
import * as path from "path";
import * as tar from "tar";
import * as glob from "glob";
import axios from "axios";

async function run(): Promise<void> {
  try {
    // Get inputs
    const registryUrl = core.getInput("registry-url", { required: true });
    const directory = path.resolve(core.getInput("directory"));
    const ignorePatterns = core.getInput("ignore-patterns").split(",");

    // Get Quaisr API token from environment
    const token = process.env.QUAISR_API_TOKEN;
    if (!token) {
      throw new Error("QUAISR_API_TOKEN environment variable is required");
    }

    core.info(`Registering block from directory: ${directory}`);

    if (!fs.existsSync(directory)) {
      throw new Error(`Directory does not exist: ${directory}`);
    }

    // Create temp file for the tar archive
    const tempTarFile = path.join(
      fs.mkdtempSync(path.join(process.env.RUNNER_TEMP || "/tmp", "quaisr-")),
      "context.tar"
    );

    // Create archive of the context
    await createTarArchive(directory, tempTarFile, ignorePatterns);

    // Get the size of the archive
    const stats = fs.statSync(tempTarFile);
    core.info(`Archive size: ${stats.size} bytes`);

    // Upload the archive to the registry
    const data = fs.readFileSync(tempTarFile);

    core.info(`Uploading to registry: ${registryUrl}`);
    const response = await axios.put(registryUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-tar",
        "Content-Length": stats.size,
        // Host: "localhost",  // required when testing locally
      },
      maxBodyLength: Infinity,
    });

    core.info(`Response status: ${response.status}`);
    core.info(`Response data: ${JSON.stringify(response.data)}`);

    if (response.status >= 200 && response.status < 300) {
      core.info("Block registration successful");
    } else {
      core.setFailed(`Failed to register block: ${response.statusText}`);
    }

    // Clean up
    fs.unlinkSync(tempTarFile);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred");
    }
  }
}

async function createTarArchive(
  sourceDir: string,
  outputFile: string,
  ignorePatterns: string[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Get all files in directory, excluding ignored patterns
    const files = glob.sync("**/*", {
      cwd: sourceDir,
      dot: true,
      ignore: ignorePatterns,
      nodir: false,
    });

    core.debug(`Files to include in archive: ${files.join(", ")}`);

    tar
      .create(
        {
          gzip: false,
          file: outputFile,
          cwd: sourceDir,
          portable: true,
        },
        files
      )
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

run();
