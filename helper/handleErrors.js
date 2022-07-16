const handleErrors = (err) => {
	let errors = {};

	if (err.message) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[
				properties.path
			] = `'${properties.value}' is invalid. ${properties.message}`;
		});
	}
	return errors;
};

module.exports = handleErrors;
