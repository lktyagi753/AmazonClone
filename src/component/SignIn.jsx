import React, {useState} from 'react'
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
const AdditionalInfo = styled.div`
    p{
      font-size: 13px;
      font-weight: 500;
      margin: 10px auto ;
    }
    a{
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
    }
  `
  
  const SignUpInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 40px ;
    hr{
        width: 23%;
        height:0px;
        color: grey;
    }
    p{
        color: gray;
    }
   
    button{
        width: 70%;
        height: 30px;
        margin-top: 20px;
        font-weight: 600;
        background-color: white;
        border: none;
        box-shadow: 0 0 10px rgb(205, 205, 205);
        border-radius: 10px;
        cursor: pointer;
    }
    button:hover
    {
        background-color: #dad0d0;
        scale: 1.1;
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
      margin: 20px auto;
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
export default function SignIn() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{}, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();

    axios
      .post("/auth/signin", { email, password })
      .then((res) => {
        if (!res.data.error) {
          dispatch({
            type: "SET_USER",
            user: res.data,
          });

          localStorage.setItem("user", JSON.stringify(res.data));

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
      <img src="./amazon.png" alt=''/>
      </Logo>
      <FormContainer onSubmit={login}>
        <h3>Sign in</h3>
        <InputContainer>
          <p>Email</p>
          <input required type="email" placeholder='example@gmail.com' autoFocus="on"
          onChange={(e) => setEmail(e.target.value === " " ? "" : e.target.value)}
          min={2}
          value={email}/>
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input required type="password"
          onChange={(e) => setPassword(e.target.value === " " ? "" : e.target.value)}
          value={password} />
        </InputContainer>

        <Create>
          <button type='submit'>Sign in</button>
        </Create>

        <AdditionalInfo>
          <p>By continuing, you agree to Amazon's <a href="/conditons">Conditions of Use</a> and <a href="/privacy">Privacy Policy</a>.</p>
        </AdditionalInfo>
      </FormContainer>
      <SignUpInfo>
        <hr />
        <p>New to Amazon</p>
        <hr />
        <button onClick={() => navigate("/signup")}>Create Your Amazon Account </button>
      </SignUpInfo>
      <Bottom>
        <hr />
        <p>© 2023, Amazon.com, Inc. or its affiliates, Created by Lovekush Tyagi</p>
      </Bottom>
    </Container>
  )

}
