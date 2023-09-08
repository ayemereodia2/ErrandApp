import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";

import Message from "./Message";

import { theme } from "../../theme";
import { ChatInputProp } from "./ChatInput";

const MessagesList = ({ onSwipeToReply }: ChatInputProp) => {
	const [messages, setMessages] = useState([
		{
			user: 0,
			time: "12:07",
			content: "7 o'clock?",
		},
		{
			user: 1,
			time: "12:09",
			content: "Sounds good",
		},
	]);

	const user = useRef<any>(0);
	const scrollView = useRef<any>();

	return (
		<ScrollView style={{ backgroundColor: theme.colors.white, flex: 1 }}
			ref={ref => scrollView.current = ref}
			onContentChange={() => {
				scrollView.current.scrollToEnd({ animated: true })
			}}
		> 
			{messages.map((message, index) => (
				<Message
					key={index}
					time={message.time}
					isLeft={message.user !== user.current}
					message={message.content}
					onSwipe={onSwipeToReply}
				/>
			))}
		</ScrollView>
	);
};

export default MessagesList;