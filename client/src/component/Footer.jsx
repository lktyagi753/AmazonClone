import React from 'react'
import { styled } from 'styled-components';

function Footer() {
  return (
      <Bottom>
        <p>© 2023, Amazon.com, Inc. or its affiliates, Created by Lovekush Tyagi</p>
      </Bottom>
  )
}
  const Bottom = styled.div`
  margin-top: 50px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  color: white;
  background-color: rgb(22, 26, 26);
  
    p{
      padding: 40px ;
      font-size: 14px;
      margin-top: 5px;
      font-weight:500;
      text-align: center;
      line-height: 1.4;
    }
    `;
export default Footer
