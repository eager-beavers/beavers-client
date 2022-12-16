import {useEffect, useState} from "react";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {io} from 'socket.io-client';
import axios from "axios";
import {
    ChattingBody,
    ChattingButtonBox,
    ChattingFooter,
    ChattingHeader,
    ChattingInput,
    ChattingLayout,
    ChattingOptionButton,
    ChattingSendButton
} from "./style";
import {ChattingMessageModel} from "../../model/ChattingMessage";

type Position = {
    xRate: number;
    yRate: number;
};

const socket = io('http://localhost:3000/chat');

const ChattingWindow = (props: any) => {

    const {open, setOpen} = props;
    const [message, setMessage] = useState<string>("");
    const [messageList, setMessageList] = useState<Array<ChattingMessageModel>>([]);

    const [currentPosition, setCurrentPosition] = useState<Position>({
        xRate: 600,
        yRate: -300
    });

    useEffect(() => {
        const messageHandler = (chat: ChattingMessageModel) => {
            setMessageList(prev => [...prev, chat]);
        };

        socket.on('message', messageHandler);

        return () => {
            socket.off('message', messageHandler);
        };
    }, []);


    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        setCurrentPosition({xRate: data.lastX, yRate: data.lastY});
    };

    const sendMessage = () => {
        const payload = new ChattingMessageModel('test', message, new Date().getTime());
        axios.post("http://127.0.0.1:3000", payload).catch(e => console.log(e));
        setMessage("");
    };

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
                <ChattingHeader>
                    <ChattingButtonBox>
                        <ChattingOptionButton color={"red"} onClick={() => setOpen(false)}/>
                        <ChattingOptionButton color={"orange"}/>
                        <ChattingOptionButton color={"green"}/>
                    </ChattingButtonBox>
                </ChattingHeader>
                <ChattingBody>
                    {messageList.map(data => <div key={data.createAt}>{data.message}</div>)}
                </ChattingBody>
                <ChattingFooter>
                    <ChattingInput value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <ChattingSendButton value={message} onClick={sendMessage}>전송</ChattingSendButton>
                </ChattingFooter>
            </ChattingLayout>
        </Draggable>
    )
};

export default ChattingWindow;