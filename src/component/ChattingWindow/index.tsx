import {useState} from "react";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {
    ChattingLayout,
    ChattingHeader,
    ChattingButtonBox,
    ChattingOptionButton,
    ChattingBody,
    ChattingFooter,
    ChattingInput,
    ChattingSendButton
} from "./style";

type Position = {
    xRate: number;
    yRate: number;
};

const ChattingWindow = ({open: boolean = true}) => {

    const [message, setMessage] = useState<string>("");

    const [currentPosition, setCurrentPosition] = useState<Position>({
        xRate: 600,
        yRate: -300
    });

    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        setCurrentPosition({xRate: data.lastX, yRate: data.lastY});
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
            <ChattingLayout>
                <ChattingHeader>
                    <ChattingButtonBox>
                        <ChattingOptionButton color={"red"}/>
                        <ChattingOptionButton color={"orange"}/>
                        <ChattingOptionButton color={"green"}/>
                    </ChattingButtonBox>
                </ChattingHeader>
                <ChattingBody/>
                <ChattingFooter>
                    <ChattingInput value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <ChattingSendButton value={message}>전송</ChattingSendButton>
                </ChattingFooter>
            </ChattingLayout>
        </Draggable>
    )
};

export default ChattingWindow;