import { objectToFormData } from "./formDataHelper";

describe("objectToFormData", () => {
	let formData;

	beforeEach(() => {
		formData = new FormData();
		formData.append = jest.fn();
	});

	test("convert object to form data", () => {
		const object = {
			title: "Test",
			body: "Content",
		};

		objectToFormData(object, null, formData);

		// verify appends
		expect(formData.append).toHaveBeenCalledWith("title", "Test");
		expect(formData.append).toHaveBeenCalledWith("body", "Content");
	});

	test("convert to date", () => {
		const date = new Date("01-01-2024");

		const object = { created_at: date };

		objectToFormData(object, null, formData);

		expect(formData.append).toHaveBeenCalledWith(
			"created_at",
			date.toISOString()
		);
	});

	test("convert to form data using namespace", () => {
		const object = { title: "Test" };
		const namespace = "post";

		objectToFormData(object, namespace, formData);

		expect(formData.append).toHaveBeenCalledWith("post[title]", "Test");
	});

	test("use object inside another object", () => {
		const object = {
			postData: {
				title: "Test",
				body: "Test content",
			},
		};
		const namespace = "post";

		objectToFormData(object, namespace, formData);

		expect(formData.append).toHaveBeenCalledWith(
			"post[postData][title]",
			"Test"
		);
		expect(formData.append).toHaveBeenCalledWith(
			"post[postData][body]",
			"Test content"
		);
	});
});
