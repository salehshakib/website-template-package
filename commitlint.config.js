// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // (Optional) You can add custom rules here:
  rules: {
    "header-max-length": [2, "always", 72],
    // e.g. require scope for feats and fixes:
    "scope-enum": [2, "always", ["parser", "ui", "backend"]],
  },
};
