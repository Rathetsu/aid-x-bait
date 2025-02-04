import { RTCPeerConnection, RTCSessionDescription } from "react-native-webrtc";
import io from "socket.io-client";

const socket = io(process.env.EXPO_PUBLIC_BACKEND_URL);

const pc = new RTCPeerConnection({
	iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN server for NAT traversal.
});

// Signaling logic
const joinRoom = (room: string) => {
	socket.emit("join", room);

	socket.on("user-joined", async (id: string) => {
		const offer = await pc.createOffer({});
		await pc.setLocalDescription(offer);
		socket.emit("signal", { room, signal: offer });
	});

	socket.on("signal", async (data: { id: string; signal: any }) => {
		if (data.id !== socket.id) {
			await pc.setRemoteDescription(new RTCSessionDescription(data.signal));
			if (data.signal.type === "offer") {
				const answer = await pc.createAnswer();
				await pc.setLocalDescription(answer);
				socket.emit("signal", { room, signal: answer });
			}
		}
	});
};

export { pc, joinRoom, socket };
