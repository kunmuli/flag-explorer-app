module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
