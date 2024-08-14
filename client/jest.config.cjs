module.exports = {
	transform: {
		"^.+\\.jsx?$": "babel-jest",
	},
	moduleFileExtensions: ["js", "jsx"],
	setupFilesAfterEnv: ["@testing-library/jest-dom"],
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
	},
};
