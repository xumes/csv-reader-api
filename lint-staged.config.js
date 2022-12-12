module.exports = {
  "*.{ts,js,json}": ["npm run check:format", "npm run check:lint"],
  "*.ts": () => "npm run check:types",
}
