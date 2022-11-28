import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userPostSelector } from "../../store/user posts/userPostSelector";

export const DirectChatMainPage = () => {
	const userId = useSelector(userPostSelector);
	const [socket, setSocket] = useState(null);
	useEffect(() => setSocket(io("http://localhost:8900")), []);

	useEffect(() => socket?.emit("addUser"));

	return <div>web socket</div>;
};
