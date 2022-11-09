import React, { useState } from "react";
import axios from "axios";
import ViewImages from "./ViewImages";
const Images = () => {
  const [image, setImage] = useState();
  const [imageName, setimageName] = useState("");

  const [user, SetUser] = useState({
    name: "",
  });
  const { name } = user;
  const selectHandler = (e) => {
    setImage(e.target.files[0]);
    setimageName(e.target.files[0].name);
  };

  const imagetype = [];

  // uploading the iumage to backend

  const fileUploadHandler = async (e) => {
    e.preventDefault();

    //   }
    try {
      // if image exist
      if (image) {
        // if image is of different type
        if (
          image.type === "image/jpeg" ||
          image.type === "image/png" ||
          image.type === "image/jpg"
        ) {
          // validating image size
          if (image.size <= 102380) {
            // if everey thing goes well
            let { body } = user;
            console.log("body", user);
            e.preventDefault();
            localStorage.setItem("image", image.name);
            const formData = new FormData();
            formData.append("file", image);
            formData.append("fileName", imageName);
            formData.append("body", user);
            const options = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              body: JSON.stringify(body),
            };
            try {
              const res = await axios.post(
                "http://localhost:8000/upload",
                formData,
                user
              );
              console.log(body);
              // before sending this send the user id
              const data = await res.err;
              console.log(data);
            } catch (ex) {
              console.log(ex);
            }
          } else {
            alert(
              `the image size is ${Math.round(
                image.size / 1024
              )}KB please upload image with 100kB`
            );
          }
        } else {
          alert("please enter a valid image");
        }
      } else {
        alert("please enter a image");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userHandler = (e) => {
    SetUser(e.target.value);
  };
  return (
    <>
      <form encype="multipart/form-data">
        <label>Name:</label>
        <input type="text" value={name} onChange={userHandler} />
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            setImage(event.target.files[0]);
            console.log("Files", event.target.files[0]);
          }}
        />
        <button onClick={fileUploadHandler}>upload</button>
      </form>
      <ViewImages />
    </>
  );
};

export default Images;
