import LoginPage from "./component/login/login.componet";
import { Routes, Route } from "react-router-dom";
import SingInPage from "./component/sing_in/sing_in.component";
import { makeGetRequest } from "./servise/axios";
import { useDispatch } from "react-redux";
import NavBar from "./component/nav-bar/nav.component";
import { FeedPage } from "./component/feed-page/feed_page";
import { Profile } from "./component/user_profile/profile";
import { DirectChatMainPage } from "./component/message/direct-chat-main";

import "./App.css";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<NavBar />}>
					<Route index={true} element={<FeedPage />} />
					<Route path="profile" element={<Profile />} />
					<Route path="direct" element={<DirectChatMainPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/singin" element={<SingInPage />} />
			</Routes>
		</div>
	);
}

export default App;
