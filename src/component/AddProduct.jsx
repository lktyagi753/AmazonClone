import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();


  const addProduct = (e) => {
    e.preventDefault();

    axios
      .post("/products/add", { title, imageURL, price, rating })
      .then(() => {
        setTitle("");
        setImageURL("");
        setPrice(0);
        setRating(0);
        navigate('/');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Container>
      <Logo>
      <img onClick={() => navigate('/')} src="./amazon.png" alt=''/>
      </Logo>
      <FormContainer>
        <h3>Add Product</h3>
        <InputContainer>
          <p>Title</p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </InputContainer>
        <InputContainer>
          <p>ImageURL</p>
          <input
            type="text"
            onChange={(e) => setImageURL(e.target.value)}
            value={imageURL}
          />
        </InputContainer>
        <InputContainer>
          <p>Price</p>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </InputContainer>
        <InputContainer>
          <p>Rating</p>
          <input
            type="number"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
          />
        </InputContainer>

        <Create>
          <button onClick={addProduct}>Add item</button>
        </Create>
      </FormContainer>
    </Container>
  )
}

const Container = styled.div`
width: 80%;
min-width: 500px;
max-width: 500px;
height: fit-content;
padding:15px;
margin: auto;
display: flex;
flex-direction: column;
align-items: center;
`
const Logo = styled.div`
width: 120px;
margin-bottom: 20px;
img{
  width: 100%;
}
`
const FormContainer = styled.form`
  border: 1px solid #ccc6c6;
  box-shadow: 0 0 10px #F5F5F5;
  width: 65%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 9px;

  h3{
    font-size: 28px;
    font-weight: 500;
    line-height: 30px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
  
  `
const InputContainer = styled.div`
    width: 100%;
    padding: 5px;

    p{
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    input{
      width: 95%;
      height: 30px;
      padding-left: 5px;
      border-radius: 5px;
      border: 1px solid lightgray;
      font-size: 14px;
    }
    input:focus{
      outline: none;
      box-shadow: 0 0 10px skyblue;
      background-color: #fbfeff;
    }
  `
const Create = styled.div`
    width: 100%;
    button{
      width: 100%;
      padding: 7px;
      margin: 20px auto 10px;
      border-radius:8px;
      background-color: #ffdf0d;
      font-size: 15px;
      border: none;
      cursor: pointer;
    }
    button:hover{
       background-color: #cab10b;
       scale: 1.05;
    }
  `

export default AddProduct
