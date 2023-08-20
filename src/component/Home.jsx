import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  const [products, setProducts] = useState("");
  
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/products/get");
      setProducts(data);
    };
    fetchdata();
  }, []);

  

  return (
    <Container>
      <Navbar />
      <Banner>
        <img src="./Backimg.jpg" alt="" />
        <img src="./Mobile_Backimg.jpg" alt="" />
      </Banner>

      <Main>
        {products &&
          products?.data.map((product) => (
            <Card
              id={product._id}
              image={product.imageURL}
              price={product.price}
              rating={product.rating}
              title={product.title}
            />
          ))}
      </Main>
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
    background-color: rgb(234, 237, 237);
`;

const Banner = styled.div`
 width: 100%;
img{
    z-index: -1;
    width: 100%;
    -webkit-mask-image: linear-gradient( to bottom,
        rgba(0, 0, 0, 2),
        rgba(0, 0, 0, 0.95),
        rgba(0, 0, 0, 0.85),
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.55),
        rgba(0, 0, 0, 0));

        &:nth-child(2){
            display: none;
        }

        @media only screen and (max-width: 767px)
        {
            &:nth-child(1){
            display: none;
            }
            &:nth-child(2){
            display: block;
            -webkit-mask-image:none;
            }
        }
}
`;

const Main = styled.div`
  display: grid;
justify-content: center;
place-items: center;
width: 100%;

grid-auto-rows: 450px;
grid-template-columns: repeat(4, 300px);
grid-gap: 20px;

@media only screen and (max-width: 400px)
{
    grid-template-columns: 90%;
}

@media only screen and (min-width: 400px) and (max-width: 900px)
{
    grid-template-columns: repeat(2, 45%);
    margin-top: -20px;
}

@media only screen and (max-width: 1200px) and (min-width: 900px)
{
    grid-template-columns: repeat(3, 30%);
}

@media only screen and (min-width: 767px)
{
    margin-top: -130px;
    padding: 10px;
}
`;
export default Home;