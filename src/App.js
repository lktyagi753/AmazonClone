import React from 'react'
import styled from 'styled-components'
import 
{
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import CreacteAcc from './component/CreacteAcc'
import SignIn from './component/SignIn'
import Home from './component/Home'
import CheckOut from './component/CheckOut'
import Address from './component/Address'
import Payment from './component/Payment'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'
import AddProduct from './component/AddProduct'
import Orders from "./component/Orders";

const promise = loadStripe(
 "pk_test_51NetPNSJXS9mts3jw6nIWhEXxJE2M00gvMD8DphR12zH37XfIKONm7ybttzNxwwu1vFwYy6OfnLa2emhxh4tvk2M00Q3AtaBix"
)

function App() {
  return (
  <Router>
    <Container>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/signup" element={<CreacteAcc/>}></Route>
    <Route path="/checkout" element ={<CheckOut/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/address" element={<Address/>}></Route>
    <Route path="/payment" 
           element = {<Elements stripe = {promise}>
      <Payment/>
      </Elements>}>
    </Route>
    <Route path='/addproduct' element={<AddProduct/>} />
    <Route path="/orders" element={<Orders />} />
    </Routes>
    </Container>
  </Router>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;