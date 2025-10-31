import React, { useState,useEffect } from "react";
import './ProfileImageUpload.css'
const ProfileImageUpload = ({ onImageSelect,setImagePath,reset,setReset}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const maxSize = 2 * 1024 * 1024; // 2MB

  useEffect(() =>{
    if(reset) {
    setSelectedImage(null);
    setError(null);
    onImageSelect(null);
    }
  },[reset]);
  const handleImageChange = (event) => {
    setReset(false);
    const imageFile = event.target.files[0];
    if (imageFile) {
      if (imageFile.size > maxSize) {
        setError("File size exceeds the 2MB limit");
        setSelectedImage(null);
        onImageSelect(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImagePath(reader.result);
        setError(null);
        onImageSelect(imageFile);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setSelectedImage(null);
      setError(null);
      onImageSelect(null);
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setError(null);
    onImageSelect(null);
  };

  return (
    <div className="form-group main_input">
      {selectedImage && (
        <div className="image-preview mt-2">
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50%" }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm mt-2"
            onClick={resetImage}
          >
            Remove Image
          </button>
        </div>
      )}
      <label htmlFor="profileImage">Profile Image</label>
      <input
        type="file"
        onChange={handleImageChange}
        className="form-control"
        name="profileImage"
        accept="image/*"
        aria-describedby="profileImageHelp"
      />
      {error && (
        <div className="text-danger mt-2">
          {error}
        </div>
      )}
      <small id="profileImageHelp" className="form-text text-muted">
        Please select an image file (max 2MB).
      </small>
    </div>
  );
};

export default ProfileImageUpload;
