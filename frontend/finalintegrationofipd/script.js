function uploadImage(data) {
  const fileInput = document.getElementById("attachment");
  const file = fileInput.files[0];

  console.log(data);

  if (!file) {
    console.error("No file selected");
    return;
  }

  // Create form data
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", data);

  // Make API call
  fetch("http://localhost:3000/api/images/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log({ data });
      console.log("Image uploaded successfully:");
      // Handle success (e.g., display uploaded image)
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      // Handle error
    });
}

const button = document.getElementById("attachment");
button.addEventListener("click", uploadImage);
