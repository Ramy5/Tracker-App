/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // type must be one of these
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    // scope is required and must be uppercase with numbers e.g. GOLD-01
    "scope-empty": [2, "never"],
    "scope-case": [0], // disable default case check so we can allow uppercase
  },
};

module.exports = config;
