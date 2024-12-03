import React, { useState, useEffect } from "react";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  // File
  const handleFileSelect = () => {
    document.getElementById("fileToUpload")?.click();
  };

  // Once the file is selected it gets stored and the submit button should pop up
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsFileSelected(true);
    }
  };

  // When submit is clicked content should be displayed on the white part of the screen
  // need backend etc for this portion may need to alter
  const handleSubmitFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append("fileToUpload", file);

      fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          //setMessage("File uploaded successfully");
          console.log(data);
          localStorage.setItem("summary", data.summary);
          setIsFileSelected(false);
        })
        .catch((error) => {
          //setMessage("Error uploading file");
        });
    } else {
      //setMessage("No file selected.");
    }
  };

  return (
    <div>upload</div>
  );
}

export default Upload;
