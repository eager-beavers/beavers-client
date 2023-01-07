import {useEffect, useState} from "react";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {io} from 'socket.io-client';
import axios from "axios";
import {isEmpty} from "lodash";
import {
    ChattingBody,
    ChattingButtonBox,
    ChattingContent,
    ChattingFooter,
    ChattingHeader,
    ChattingInput,
    ChattingLayout,
    ChattingNickNameButton,
    ChattingNickNameInput, ChattingNickNameTitle,
    ChattingOptionButton,
    ChattingSendButton,
    ChattingWrapper,
    MyMessage, MyTime,
    OtherTime,
    OtherMessage, ChattingOtherDetail, OtherName, MyName, ChattingMyDetail
} from "./style";
import {ChattingMessageModel} from "../../model/ChattingMessage";

type Position = {
    xRate: number;
    yRate: number;
};

const socket = io('http://localhost:3000/chat');

const ChattingWindow = (props: any) => {

    const {open, setOpen} = props;

    const [userNickName, setUserNickName] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messageList, setMessageList] = useState<Array<ChattingMessageModel>>([]);

    const [currentPosition, setCurrentPosition] = useState<Position>({
        xRate: 500,
        yRate: -500
    });

    useEffect(() => {
        if (!isEmpty(userNickName)) {
            const messageHandler = (chat: ChattingMessageModel) => {
                setMessageList(prev => [...prev, chat]);
            };
            socket.on('message', messageHandler);
            return () => {
                socket.off('message', messageHandler);
            };
        }
    }, [userNickName]);


    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        setCurrentPosition({xRate: data.lastX, yRate: data.lastY});
    };

    const sendMessage = () => {
        const payload = new ChattingMessageModel(userNickName, message, new Date().getTime());
        axios.post("http://127.0.0.1:3000", payload).catch(e => console.log(e));
        setMessage("");
    };

    const timeFormat = (time: number) => {
        return `${new Date(time).getHours() < 10 ? 0 : ''}${new Date(time).getHours()}:${new Date(time).getMinutes() < 10 ? 0 : ''}${new Date(time).getMinutes()}`
    }

    return (
        <Draggable
            position={{
                x: currentPosition.xRate,
                y: currentPosition.yRate
            }}
            onDrag={onDrag}
            scale={0.5}
        >
            <ChattingLayout open={open}>
                {
                    !isEmpty(userNickName)
                        ?
                        <ChattingContent>
                            <ChattingHeader>
                                <ChattingButtonBox>
                                    <ChattingOptionButton color={"red"} onClick={() => setOpen(false)}/>
                                    <ChattingOptionButton color={"orange"}/>
                                    <ChattingOptionButton color={"green"}/>
                                </ChattingButtonBox>
                            </ChattingHeader>
                            <ChattingBody>
                                {messageList.map(data =>
                                    data.owner === userNickName
                                        ? <ChattingWrapper key={data.createAt}>
                                            <ChattingMyDetail>
                                                <MyTime key={data.createAt + data.createAt}>{timeFormat(data.createAt)}</MyTime>
                                                <MyName key={data.createAt +data.owner}>{data.owner}</MyName>
                                            </ChattingMyDetail>
                                            <MyMessage key={data.createAt + data.message}>{data.message}</MyMessage>
                                        </ChattingWrapper>
                                        :
                                        <ChattingWrapper key={data.createAt}>
                                            <ChattingOtherDetail>
                                                <OtherName key={data.createAt +data.owner}>{data.owner}</OtherName>
                                                <OtherTime key={data.createAt + data.createAt}>{timeFormat(data.createAt)}</OtherTime>
                                            </ChattingOtherDetail>
                                            <OtherMessage key={data.createAt + data.message}>{data.message}</OtherMessage>
                                        </ChattingWrapper>
                                )}
                            </ChattingBody>
                            <ChattingFooter>
                                {/* onKeyDown api call 두번 날아감, onKeyPress api call 한번 날아감 무슨 차이점? */}
                                <ChattingInput
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <ChattingSendButton value={message} onClick={sendMessage}>전송</ChattingSendButton>
                            </ChattingFooter>
                        </ChattingContent>
                        :
                        <ChattingContent>
                            <ChattingNickNameTitle>
                                Beavers Chat
                            </ChattingNickNameTitle>
                            <ChattingNickNameInput value={userInput} placeholder={"Name"}
                                                   onChange={(e) => setUserInput(e.target.value)}/>
                            <ChattingNickNameButton
                                value={userInput}
                                onClick={() => setUserNickName(userInput)}>확인</ChattingNickNameButton>
                        </ChattingContent>
                }
            </ChattingLayout>
        </Draggable>
    )
};

export default ChattingWindow;