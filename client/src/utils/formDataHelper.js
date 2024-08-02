export function objectToFormData(
	// converts a JS object in FormData
	obj,
	namespace = null,
	// if it is not passed a formData (context: create Post), will create a new
	formData = new FormData()
) {
	for (let propertyName in obj) {
        // for each prop, will check if it is valid and append according with the type (function appendToFormData)
		if (isValidProperty(obj, propertyName)) {
			const formKey = getFormKey(namespace, propertyName); // format -> namespace[propertyName]
			appendToFormData(formData, formKey, obj[propertyName]); // add prop to formData
		}
	}
	return formData;
}

function isValidProperty(obj, propertyName) {
	return (
		Object.prototype.hasOwnProperty.call(obj, propertyName) &&
		obj[propertyName] !== undefined &&
		obj[propertyName] !== null
	);
}

function getFormKey(namespace, propertyName) {
	// if it has a namespace, will be namespace[propertyName], if it has not: propertyName
	return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

function appendToFormData(formData, formKey, value) {
	if (value instanceof Date) {
		appendAsDate(formData, formKey, value);
	} else if (isObjectButNotFile(value)) {
		objectToFormData(value, formKey, formData);
	} else {
		formData.append(formKey, value);
	}
}

function appendAsDate(formData, formKey, date) {
	// add date to formData with a ISO format
	formData.append(formKey, date.toISOString());
}

function isObjectButNotFile(value) {
	return typeof value === "object" && !(value instanceof File);
}