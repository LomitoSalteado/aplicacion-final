import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ImageUploader({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Error al subir el archivo:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL);
        setProgress(0);
        if (onUploadComplete) onUploadComplete(downloadURL);
      }
    );
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "auto" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="card-title text-center mb-4">Subir Imagen</h2>
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`btn btn-primary w-100 ${!file ? "disabled" : ""}`}
        >
          Subir
        </button>
        {progress > 0 && progress < 100 && (
          <div className="progress mt-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${progress}%` }}
            >
              {progress.toFixed(2)}%
            </div>
          </div>
        )}
        {file && !url && (
          <div className="mt-4 text-center">
            <p className="text-info">Archivo: {file.name}</p> {/* Solo mostrar el nombre del archivo */}
          </div>
        )}
        {url && (
          <div className="mt-4 text-center">
            <p className="text-success">¡Imagen subida con éxito!</p>
            <p>Archivo: {file.name}</p> {/* También mostrar el nombre del archivo en éxito */}
            {/* Ya no mostramos la imagen, solo el nombre del archivo */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
