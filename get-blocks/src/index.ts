import * as core from "@actions/core";
import axios from "axios";

async function run(): Promise<void> {
  try {
    // Get inputs
    const registryUrl = core.getInput("registry-url", { required: true });

    // Get Quaisr API token from environment
    const token = process.env.QUAISR_API_TOKEN;
    if (!token) {
      throw new Error("QUAISR_API_TOKEN environment variable is required");
    }

    core.info(`Using registry url: ${registryUrl}`);

    const blocksEndpoint = registryUrl.endsWith("/")
      ? `${registryUrl}blocks`
      : `${registryUrl}/blocks`;

    core.info(`Blocks endpoint: ${blocksEndpoint}`);

    const response = await axios.get(blocksEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    core.info(`Response status: ${response.status}`);
    core.info(`Response data: ${JSON.stringify(response.data)}`);

    if (response.status >= 200 && response.status < 300) {
      core.info("Successfully fetched blocks:");
      core.info(response.data);
    } else {
      core.setFailed(`Failed to register block: ${response.statusText}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred");
    }
  }
}

run();
