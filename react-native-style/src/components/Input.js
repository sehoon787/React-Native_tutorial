import React from "react";
import styled from 'styled-components/native';

// const StyledInput = styled.TextInput`
//   width: 200px;
//   height: 60px;
//   margin: 5px;
//   padding: 10px;
//   border-radius: 10px;
//   border: 2px;
//   border-color: black;
//   font-size: 24px;
// `;

const StyledInput = styled.TextInput.attrs(props => ({
    placeholder: "Enter a Text...",
    placeholderTextColor: props.borderColor
}))`
  width: 200px;
  height: 60px;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  border: 2px;
  border-color: ${props => props.borderColor};
  font-size: 24px;
`;

// const Input = () =>{
const Input = props =>{
    return <StyledInput borderColor={props.borderColor}/>
    // return <StyledInput placeholder="Enter a Text..." placeholderTextColor="black"/>
    // return(
    //     <StyledInput placeholder="Enter a Text..." placeholderTextColor="black" />
    // );
};

export default Input;