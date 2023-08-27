import React from 'react'
import { styled } from 'styled-components'
import Rating from '@mui/material/Rating';
import { useStateValue } from '../StateProvider';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

function Card({id, title, image, price, rating}) {

    const navigate = useNavigate();
    const [{basket, user}, dispatch] = useStateValue();
    console.log("basket >> ", basket);
    const addToBasket = (e) =>
    {
        e.preventDefault();
        // console.log(user.email);
        if(user === null)
        navigate('/signin')
        dispatch({
            type : "ADD_TO_BASKET",
            item :{
                id,
                title,
                price, 
                image,
                rating,
            }
        })
    }

    return (
        <Container>
            <Image>
                <img src={image} alt=''/>
            </Image>
            <Description >
                <h5>{title}</h5>
                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                <NumericFormat
                    renderText={(value) => (<p className='price'>{value}</p>)}
                    decimalScale={2}
                    value={price}
                    displayType='text'
                    thousandSeparator={true}
                    prefix='₹' 
                />
                <button onClick={addToBasket}
                >Add to Cart</button>
            </Description>
        </Container>
    )
}

export default Card

const Container = styled.div`

width: 100%;
height: 100%;
display: flex;
flex-direction: column;
z-index: 10;
background-color: #fff;
font-family: sans-serif;
border-radius: 20px;
box-shadow: 0 0 10px grey;
`;

const Image = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 20px;
flex: 0.3;

img{
    width: 180px;
    height: 200px;
}
`;
const Description = styled.div`
width:90%;
margin: auto;
display: flex;
flex-direction: column;
justify-content: space-evenly;
flex: 0.7;

h5{
    font-size: 16px;
    font-weight: 600;
}

p
{
    font-weight: 900px;
    font-size: 1.3rem;
}
button{
    width: 100%;
    height: 33px;
    background-color: #fa8900;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}
`;
