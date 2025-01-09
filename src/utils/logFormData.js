const logFormData = (formData) => {
  const formDataObj = Object.fromEntries(formData);
  console.log("formdata item ===", formDataObj);
};

export default logFormData;