import styled from "styled-components";

export const ChattingLayout = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
  border-radius: 20px;
  background-color: red;
`

export const ChattingHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
`

export const ChattingBody = styled.div`
  width: 100%;
  height: 400px;
  background-color: #9bbbd4;
`

export const ChattingFooter = styled.div`
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  border-radius: 0 0 20px 20px;

  display: flex;
  align-items: center;
`

export const ChattingInput = styled.input`
  width: 70%;
  height: 120px;
  border: none;
  outline: none;
  background-color: transparent;
  color: black;
  padding: 20px;
`

export const ChattingSendButton = styled.button`
  width: 70px;
  height: 70px;

  background-color: ${props => props.value === "" ? "lightgrey" : "#fef01b"};
  color: ${props => props.value === "" ? "grey" : "black"};

  &:focus {
    outline: none;
  }
`

export const ChattingButtonBox = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
`

export const ChattingOptionButton = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  padding: 0;
  margin: 5px;
  background-color: ${props => props.color};

  &:focus {
    outline: none;
  }
`