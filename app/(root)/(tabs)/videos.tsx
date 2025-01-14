import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoGallery } from "../../../components/VideoGallery/VideoGallery"

const Videos = () => {
	return (
		<SafeAreaView>
			<VideoGallery />
		</SafeAreaView>
	);
};

export default Videos;
