import React from "react";
import useURLSearchParam from "./useURLSearchParam";
import { useSearchParams } from "react-router-dom";
import { renderHook, act } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
	useSearchParams: jest.fn(),
}));

describe("useURLSearchParam hook", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("returns param value if it is present", () => {
		const searchParams = new URLSearchParams();

		//setting testing name and value at search params
		searchParams.set("testName", "testValue");

		const setSearchParams = jest.fn();

		//using useSearchParams hook with mocking const and function
		useSearchParams.mockReturnValue([searchParams, setSearchParams]);

		const { result } = renderHook(() =>
			useURLSearchParam("testName", "defaultValue")
		);

		//verify result value
		expect(result.current[0]).toBe("testValue");
	});

	test("updates URL search params when call setParamValue", async () => {
		const searchParams = new URLSearchParams();

		const setSearchParams = jest.fn();

		useSearchParams.mockReturnValue([searchParams, setSearchParams]);

		const { result } = renderHook(() => useURLSearchParam("testName"));

		act(() => {
			// result.current[1] = setParamValue (will set with "testValue")
			result.current[1]("testValue");
		});

		expect(setSearchParams).toHaveBeenCalledWith({
			testName: "testValue",
		});
	});

	test("deletes URL search params when there is not a value", async () => {
		const searchParams = new URLSearchParams();

		const setSearchParams = jest.fn();

		useSearchParams.mockReturnValue([searchParams, setSearchParams]);

		const { result } = renderHook(() => useURLSearchParam());

		act(() => {
			const value = "";
			// result.current[1] = setParamValue
			result.current[1](value);

			// will remove param name because there is not a value
			if (value === "") {
				renderHook(() => useURLSearchParam());
			}
		});

		// did not have a name or a value, so need to be called a new URLSearchParams
		expect(setSearchParams).toHaveBeenCalledWith(new URLSearchParams());
	});
});
