import React from 'react'
import { useStateValue } from '../StateProvider'
import Navbar from './Navbar';
import styled from '@emotion/styled';
import { NumericFormat } from 'react-number-format';
import { getBasketTotal } from '../reducer';
import { useNavigate } from 'react-router-dom';



export default function CheckOut() {

  
  const [{basket}, dispatch] = useStateValue();
  const navigate = useNavigate();

  
  const removeFromBasket = (e,id) =>
  {
    e.preventDefault();
    
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id : id,
    });
  };

  return (
     <Container>
      <Navbar/>
      <Main>
        <ShoppingCart>
          <h2>Shopping Cart</h2>

          {basket.length === 0 ?<Empty><h3>YOUR CART IS EMPTY!!</h3></Empty>:basket.map((product)=>
            <Product>
              <Image>
                <img src={product.image} alt=''/>
              </Image>
              <Description>
                <h4>{product.title}</h4>
                <p className='price'>₹ {product.price}</p>
                <button onClick={(e)=>removeFromBasket(e,product.id)}>Remove</button>
              </Description>
            </Product>  
          )}
        </ShoppingCart>
        <Subtotal>
          <NumericFormat
            renderText={(value) => (
              <>
              <p className='price'>
                Subtotal ( {basket.length} items ) : <strong className='price'>{value}</strong>
              </p>
              <small>
                <input type="checkbox" />
                <span>This order contains a gift.</span>
              </small>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType='text'
            thousandSeparator={true}
            prefix='₹'
          />
          <button onClick={()=>navigate('/address')}>Proceed to Checkout</button>
        </Subtotal>
      </Main>
     </Container>
  );
}

const Container = styled.div`
width: 100%;
max-width: 1400px;
height: fit-content;
margin: auto;
background-color: rgb(234, 237, 237);
position: relative;
`;
const Main = styled.div`
display: flex;
padding: 15px;

@media only screen and (max-width: 1200px){
  flex-direction: column;
}
`;
const ShoppingCart = styled.div`
padding: 15px;
background-color: white;
flex: 0.7;


@media only screen and (max-width: 1200px)
{
  flex: none;
}

h2{
  font-weight: 500;
  border-bottom: 1px solid lightgray;
}
`;
const Subtotal = styled.div`
flex: 0.3;
background-color: white;
margin-left: 15px;
height: 200px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

@media only screen and (max-width: 1200px)
{
  flex: none;
  margin-top: 20px;
}

p{
  font-size: 20px;
}

small{
  display: flex;
  align-items: center;
  margin-top: 10px;
}

span{
  margin-left: 10px;
}

button{
  width: 65%;
  height: 33px;
  margin-top: 20px;
  background-color: #ffd814;
  border: none;
  outline: none; 
  border-radius: 8px;
  &:hover{
    scale: 1.1;
    cursor: pointer;
  }
}
`;
const Product = styled.div`
display:  flex;
align-items: center;
`;
const Image = styled.div`
flex: 0.3;
img{
  width: 100%;
}
`;
const Description = styled.div`
flex: 0.8;

h4{
  font-weight: 600;
  margin-top: 18px;
}
p{
  font-weight: 600;
  margin-top: 10px;
}
button{
  background-color: transparent;
  color: #1384b4;
  border: none;
  outline: none;
  margin-top: 10px;
  cursor: pointer;

  &:hover{
    text-decoration: underline;
  }
}
`;
const Empty = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 5px auto 5px;
height: 100%;
`