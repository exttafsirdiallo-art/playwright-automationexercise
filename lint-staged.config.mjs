export default {
  "*.{ts,js}": ["eslint --fix", "prettier --write", "eslint"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
};
