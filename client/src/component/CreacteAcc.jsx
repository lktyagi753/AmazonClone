import React from 'react'
import { useState } from "react";
import { styled } from 'styled-components'
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useStateValue } from "../StateProvider";


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
  cursor: pointer;
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
    .description{
      font-size: 12px;
      font-weight: 500;
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
  display: flex;
  flex-direction: column;
    p{
      font-size: 13px;
      margin-top: 5px;
      font-weight:500;
    }
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
const AdditionalInfo = styled.div`
    hr{
      width: 60%;
      margin: 20px auto;
      border-radius: 100%;
      opacity: 0.3;
      height: 2.4px;
      border: none;
      background-color: #d8d5d5;
      box-shadow: 0 0 0 50px 5px lightgray;
    }
    p{
      font-size: 13px;
      font-weight: 500;
      margin: 10px auto ;
    }
    a{
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
    }
  `
  const Bottom = styled.div`
  width: 65%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  hr{
      width: 100%;
      margin: 40px auto;
      border-radius: 100%;
      opacity: 0.3;
      height: 3px;
      border: none;
      background-color: #d8d5d5;
      box-shadow: 0 0 0 50px 5px lightgray;
    }
    p{
      font-size: 12.5px;
      margin-top: 5px;
      font-weight:500;
      text-align: center;
      line-height: 1.4;
    }
  `

const LoginButton = styled.button`
  margin-left: 5px;
  outline: none;
  border: none;
  background-color: white;
  color: darkblue;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
`;


export default function CreacteAcc() {


  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();

  const signup = (e) => {
    e.preventDefault();
    axios
      .post("/auth/signup", { email, password, fullName })
      .then((res) => {
        if (!res.data.error) {
          dispatch({
            type: "SET_USER",
            user: res.data.userDetail,
          });

          localStorage.setItem("user", JSON.stringify(res.data.userDetail));

          navigate("/");
        } else if (res.data.error) {
          alert(res.data.error);
        }
      })
      .catch((err) => console.warn(err));

  };

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./amazon.png" alt='' />
      </Logo>
      <FormContainer onSubmit={signup}>
        <h3>Create Account</h3>
        <InputContainer>
          <p>Your Name</p>
          <input
           type="text"
           placeholder='Love Tyagi'
           autoFocus="on"
           onChange={(e) => setFullName(e.target.value === " " ? "" : e.target.value)}
           value={fullName}
           required
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input required type="email" placeholder='example@gmail.com'
          onChange={(e) => setEmail(e.target.value === " " ? "" : e.target.value)}
          value={email}
          min={2}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input required type="password" 
          placeholder="********"
          onChange={(e) => setPassword(e.target.value === " " ? "" : e.target.value)}
          value={password}
          />
          <p className='description'>Passwords must be at least 6 characters.</p>
        </InputContainer>

        <Create>
          <p>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.</p>
          <button type="submit">Create Account</button>
        </Create>

        <AdditionalInfo>
          <hr />
          <p>
            Already have an account? 
            <LoginButton onClick={() => navigate("/signin")}>Sign in </LoginButton></p>
          <p>By creating an account or logging in, you agree to Amazon’s <a href="/conditions">Conditions of Use</a> and <a href="/privacy">Privacy Policy</a>.</p>
        </AdditionalInfo>
      </FormContainer>
      <Bottom>
        <hr />
        <p>© 2023, Amazon.com, Inc. or its affiliates, Created by Lovekush Tyagi</p>
      </Bottom>
    </Container>
  )

}
