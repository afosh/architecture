/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["master", "main"],
  repositoryUrl: "https://github.com/afosh/architecture.git",
  GITHUB_TOKEN: "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",
  GH_TOKEN: "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",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
  ],
};
