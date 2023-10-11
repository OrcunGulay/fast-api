import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Resmi Blob olarak ayarla
    }
  };

  const convertImageToBase64 = (img) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(img);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClick = () => {
    if (selectedImage) {
      convertImageToBase64(selectedImage)
        .then((base64Image) => {
          axios({
            method: "POST",
            url: "http://localhost:8000/upload_image/", // FastAPI sunucusunun adresine göre değiştirin
            data: { base64_image: base64Image }, // Resmi JSON verisi olarak iletiyoruz
            headers: {
              "Content-Type": "application/json" // Content-Type'ı JSON olarak ayarlıyoruz
            }
          })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="App">
      <img
        src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
        width={208}
        height={208}
        alt='no have'
      />
      <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleClick}>Resmi İşle</button>
    </div>
  );
}

export default App;