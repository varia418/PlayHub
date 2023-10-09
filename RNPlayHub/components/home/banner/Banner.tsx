import {
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
	Image,
	TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useState } from "react";
import { SPACING, data } from "../../../constants";
import { useRouter } from "expo-router";

const Banner = () => {
	const { width: windowWidth } = useWindowDimensions();
	const [activeBanner, setActiveBanner] = useState<number>(0);
	const router = useRouter();

	type ItemType = {
		id: number;
		title: string;
		url: string;
		description?: string;
	};

	const renderItem = ({ item }: { item: ItemType }) => {
		return (
			<TouchableOpacity
				style={styles.bannerContainer}
				onPress={() => router.push(`/game-details/${item.id}`)}
			>
				<Image
					source={{ uri: item.url }}
					style={styles.banner}
					resizeMode="cover"
				/>
				<View style={styles.textContainer}>
					<Text numberOfLines={1} style={styles.bannerTitle}>
						{item.title}
					</Text>
					<Text numberOfLines={3} style={styles.bannerDescription}>
						{item.description}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.scrollContainer}>
			<Carousel
				data={data.games.filter((game) => game.id < 6)}
				renderItem={renderItem}
				sliderWidth={windowWidth - SPACING.generalPaddingHorizontal * 2}
				itemWidth={windowWidth - SPACING.generalPaddingHorizontal * 2}
				enableSnap={true}
				loop={true}
				autoplay={true}
				onSnapToItem={(index) => setActiveBanner(index)}
			/>
			<Pagination
				dotsLength={data.games.filter((game) => game.id <= 6).length}
				activeDotIndex={activeBanner}
				containerStyle={styles.indicatorContainer}
				dotStyle={styles.normalDot}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		overflow: "hidden",
	},
	bannerContainer: {
		width: "100%",
		height: 300,
	},
	banner: {
		flex: 1,
		overflow: "hidden",
		alignItems: "flex-start",
		justifyContent: "flex-end",
	},
	textContainer: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0, 0.7)",
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 12,
		width: "60%",
		height: 100,
		bottom: 30,
		left: 10,
	},
	bannerTitle: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	bannerDescription: { color: "white" },
	normalDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 0,
		backgroundColor: "rgba(255, 255, 255, 0.92)",
	},
	indicatorContainer: {
		position: "absolute",
		bottom: -20,
		left: -10,
		padding: 0,
		margin: 0,
	},
});

export default Banner;
