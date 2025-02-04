import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RTCView } from "react-native-webrtc";

import { pc, joinRoom } from "../lib/video";

const VideoUI = () => {
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

	useEffect(() => {
		joinRoom("room1");

		pc.addEventListener("track", (event) => {
			const trackEvent = event as unknown as RTCTrackEvent;
			if (trackEvent.streams && trackEvent.streams[0]) {
				setRemoteStream(trackEvent.streams[0]);
			}
		});

		return () => {
			pc.close(); // Clean up the peer connection when the component unmounts
		};
	}, []);

	return (
		<SafeAreaView>
			<Text>Video Call</Text>
			{remoteStream ? (
				<RTCView
					streamURL={remoteStream as unknown as string}
					style={{ width: "100%", height: "100%" }}
				/>
			) : (
				<Text>Waiting for connection...</Text>
			)}
		</SafeAreaView>
	);
};

export default VideoUI;
