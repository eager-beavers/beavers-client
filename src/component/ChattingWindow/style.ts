import styled from "styled-components";

interface Layout {
    open: boolean;
}

export const ChattingLayout = styled.div<Layout>`
  position: absolute;
  width: 400px;
  height: 600px;
  border-radius: 20px;
  background-color: #ffffff;
  display: ${props => props.open ? "flex" : "none"};
  align-items: center;
  justify-content: center;
`

export const ChattingContent = styled.div`
  width: 100%;
`

export const ChattingHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
`

export const ChattingBody = styled.div`
  position: relative;
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
  width: 13px;
  height: 13px;
  border-radius: 13px;
  padding: 0;
  margin: 5px;
  background-color: ${props => props.color};
  border: none;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
  }
`

export const ChattingNickNameInput = styled.input`
  border: none;
  border-radius: 15px;
  padding: 10px;
  outline: none;
  color: #000000;
  background-color: #9bbbd4;

`

export const ChattingNickNameButton = styled.button`
  width: 75px;
  height: 40px;

  background-color: ${props => props.value === "" ? "lightgrey" : "#fef01b"};
  color: ${props => props.value === "" ? "grey" : "black"};

  &:focus {
    outline: none;
  }
`

export const ChattingWrapper = styled.div`
  position: relative;
  padding: 5px;
  display: flex;
`

const ChattingMessage = styled.div`
  color: #000000;
  padding: 5px;
  display: inline-block;
`

export const MyMessage = styled(ChattingMessage)`
  margin-left: auto;
  background-color: #fef01b;
`

export const OtherMessage = styled(ChattingMessage)`
  background-color: #ffffff;
`