import React from "react";
import { styled } from "styled-components";
import { useStateValue } from '../StateProvider';
import { useNavigate } from "react-router-dom";

function Navbar(props) {

  const [{basket, user}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <Container>
      <Inside>
        <Logo>
          <img onClick={() => navigate('/')} src="./amazon_logo.png" alt="" />
        </Logo>
        <SearchBox>
          <input type="text" placeholder="Search here" />
          <SearchLogo onClick={() => navigate('/addproduct')}>
            <img src="./search.png" alt="" />
          </SearchLogo>
        </SearchBox>
        <RightSide>
          <NavItems onClick={user ? () => signOut() : () => navigate("/signin")}>
            <p>Hello,</p>
            <p>{user ? user?.fullName : "Guest"}</p>
          </NavItems>
          <NavItems onClick={() => navigate("/orders")}>
            <p>Return</p>
            <p>& Orders</p>
          </NavItems>
          <Cart onClick={()=>navigate("/checkout")}>
            <img src="./cart.png" alt="" />
            <p>{basket?.length}</p>
          </Cart>
        </RightSide>
      </Inside>
      <ResponsiveSearchBox>
        <input type="text" placeholder="Search here" />
        <ResponsiveSearchLogo onClick={() => navigate('/addproduct')}>
          <img src="./search.png" alt=""/>
        </ResponsiveSearchLogo>
      </ResponsiveSearchBox>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #131921;
  display: flex;
  align-items: center;
  z-index: 14;

  @media only screen and (max-width: 767px) {
    height: 120px;
    flex-direction: column;
  }
`;
const Inside = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;
const Logo = styled.div`
  margin-left: 20px;
  cursor: pointer;
  img {
    margin-top: 10px;
    width: 100px;
  }
`;
const SearchBox = styled.div`
  height: 35px;
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0px 15px;
  input {
    flex: 1;
    height: 100%;
    width: 100%;
    border-radius: 6px 0 0 6px;
    border: none;
    padding: 0 10px;
    font-weight: 600;
    font-size: 16px;

    @media only screen and (max-width: 767px) {
      display: none;
    }

  }
  input:focus{
    outline: none;
    box-shadow: 0 0 10px skyblue;
  }
`;

const ResponsiveSearchBox = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 6px 0 0 6px;
    padding: 0 10px;
    font-weight: 600;
    font-size: 16px;
  }

  input:focus{
      outline: none;
      box-shadow: 0 0 10px skyblue;
    }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const ResponsiveSearchLogo = styled.div`
  background-color: #febd69;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 6px 6px 0px;
  &:hover{
    box-shadow: 0 0 10px skyblue;
  }
  cursor: pointer;
  img {
    width: 22px;
  }
  
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const SearchLogo = styled.div`
  background-color: #febd69;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 6px 6px 0px;
  cursor: pointer;
  img {
    width: 22px;
  }
  &:hover{
    box-shadow: 0 0 10px skyblue;
  }
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
`;

const NavItems = styled.div`
  color: #ffff;
  padding: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 15px;
  a{
    text-decoration: none;
    color: white;
    &:nth-child(1) {
      font-size: 12px;
    }
    &:nth-child(2) {
      font-size: 15px;
      font-weight: 700px;
    }
  }
  p {
    &:nth-child(1) {
      font-size: 12px;
    }
    &:nth-child(2) {
      font-size: 15px;
      font-weight: 700px;
    }
  }
  
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;

  img {
    width: 30px;
    margin-right: 10px;
    background-color: #131921;
  }

  p {
    color: #fff;
    font-weight: 500;
  }
`;

export default Navbar;
