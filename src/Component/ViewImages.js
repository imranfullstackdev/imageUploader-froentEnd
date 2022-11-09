import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ViewImages = () => {
  const [user, setUser] = useState([]);

  const getImages = async () => {
    const getAllImages = await fetch(`http://localhost:8000/getImages`);
    const res = await getAllImages.json();
    setUser(res);
  };
  useEffect(() => {
    getImages();
  }, []);

  console.log(user);
  const DeleteImg = async (id) => {
    // console.log(id)
    const dltuser = await fetch(`http://localhost:8000/dlt/${id}`,{
        method:'Delete'
    });
    alert('deleted sucessfully')
  };
  return (
    <>
      <h1>all images</h1>
      <div className="allImages">
        {user.map((img) => {
          return (
            <Card style={{ width: "18rem", display: "flex" }}>
              <Card.Img
                variant="top"
                src={`http://localhost:8000/uploads/${img.image.filename}`}
              />
              <Card.Body>
                <Card.Title>{img.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary" onClick={() => DeleteImg(img.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ViewImages;
