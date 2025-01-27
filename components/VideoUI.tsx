import {
	useCallStateHooks,
	CallParticipantsList,
} from "@stream-io/video-react-native-sdk";
import { Button } from "react-native";

export const MyVideoButton = () => {
	const { useCameraState } = useCallStateHooks();
	const { camera, isMute } = useCameraState();
	return (
		<Button
			title={isMute ? "Turn on camera" : "Turn off camera"}
			onPress={() => camera.toggle()}
		></Button>
	);
};

export const MyMicrophoneButton = () => {
	const { useMicrophoneState } = useCallStateHooks();
	const { microphone, isMute } = useMicrophoneState();
	return (
		<Button
			title={isMute ? "Turn on microphone" : "Turn off microphone"}
			onPress={() => microphone.toggle()}
		></Button>
	);
};

const VideoUI = () => {
	const { useParticipants } = useCallStateHooks();
	const participants = useParticipants();

	return <CallParticipantsList participants={participants} />;
};

export default VideoUI;
