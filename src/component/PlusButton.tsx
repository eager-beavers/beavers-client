import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;

  position: absolute;
  right: 50px;
  bottom: 50px;

  &::before {
    content: "";
    position: absolute;
    right: -4.5px;
    width: 25px;
    height: 25px;
    opacity: 0.5;
    border-radius: 15px;
    background-color: #888888;
  }

  &:active {
    transform: scale(0.95);
  }
`

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const PlusButton: React.FC<ButtonProps> = (props: any) => {
    const {onClick} = props;
    return <ButtonStyle onClick={onClick}>+</ButtonStyle>;
};

export default PlusButton;