import React from "react";
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => 
          props.title === "React Native" ? props.theme.blue : props.theme.purple};
  border-radius: 15px;
  padding: 15px 40px;
  margin: 10px 0px;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${props =>
      props.title === "React Native" ? "yellow" : "black"};
`;

const Button = props => {
    return(
        <ButtonContainer title={props.title}>
            <Title title={props.title}>{props.title}</Title>
        </ButtonContainer>
    );
};

export default Button;