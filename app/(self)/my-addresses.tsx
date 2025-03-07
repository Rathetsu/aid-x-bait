import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { getAddresses, setPrimaryAddress } from "@/api/address";
import { icons } from "@/constants";
import { RootState } from "@/store";
import { Address } from "@/types/type";

const MyAddresses = () => {
	const { getToken } = useAuth();
	const patientId = useSelector(
		(state: RootState) => state.user.user?.patientId
	);
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAddresses = async () => {
			try {
				if (!patientId) {
					console.error("Patient ID not found!");
					return;
				}

				const token = await getToken();
				if (!token) {
					console.error("Authentication token not found!");
					return;
				}

				const response = await getAddresses(patientId, token);
				setAddresses(
					response.sort((a: { id: number }, b: { id: number }) => a.id - b.id)
				);
			} catch (error) {
				console.error("Error fetching addresses:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAddresses();
	}, [patientId, getToken]);

	const getTypeIcon = (type: string) => {
		return type === "House" ? (
			<FontAwesome5 name="home" size={18} color="#007bff" />
		) : (
			<MaterialCommunityIcons
				name="office-building"
				size={18}
				color="#007bff"
			/>
		);
	};

	const handleSetPrimary = async (addressId: number) => {
		try {
			const token = await getToken();
			if (!token) return;

			const currentPrimary = addresses.find((addr) => addr.is_primary);
			if (currentPrimary) {
				await setPrimaryAddress(currentPrimary.id, token, false);
			}

			await setPrimaryAddress(addressId, token, true);
			setAddresses((prev) =>
				prev.map((addr) => ({
					...addr,
					is_primary: addr.id === addressId,
				}))
			);
		} catch (error) {
			console.error("Error setting primary address:", error);
		}
	};

	if (loading) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#007bff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white px-4 py-6 mt-2">
			<View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
				<TouchableOpacity onPress={() => router.back()}>
					<View className="w-10 h-10 bg-white rounded-full items-center justify-center">
						<Image
							source={icons.backArrow}
							resizeMode="contain"
							className="w-6 h-6"
						/>
					</View>
				</TouchableOpacity>
			</View>

			<Text className="text-center text-2xl font-semibold py-4 mb-4">
				My Addresses
			</Text>

			<FlatList
				data={addresses}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View
						className={`p-4 rounded-lg border ${item.is_primary ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"} mb-3`}
					>
						<View className="flex-row items-center justify-between mb-1">
							<View className="flex-row items-center">
								{getTypeIcon(item.address_type)}
								<Text className="text-lg font-semibold ml-2">
									{item.address_label}
								</Text>
							</View>
							<TouchableOpacity
								onPress={() => router.push(`/(self)/edit-address/${item.id}`)}
							>
								<View className="flex-row items-center">
									<FontAwesome5 name="edit" size={16} color="#007bff" />
									<Text className="text-blue-500 font-medium ml-1">Edit</Text>
								</View>
							</TouchableOpacity>
						</View>

						<Text className="text-base text-gray-500">
							{item.street}, {item.city}
						</Text>
						<Text className="ml-6 text-sm text-gray-500">
							{item.governorate}
						</Text>
						<Text className="text-sm text-gray-500 mt-1">{item.phone}</Text>

						{item.is_primary && (
							<View className="mt-2 px-2 py-1 bg-blue-500 rounded-md self-start">
								<Text className="text-white text-xs font-medium">Primary</Text>
							</View>
						)}

						{!item.is_primary && (
							<TouchableOpacity
								className="mt-3"
								onPress={() => handleSetPrimary(item.id)}
							>
								<Text className="text-blue-500 font-medium">Make Primary</Text>
							</TouchableOpacity>
						)}
					</View>
				)}
			/>

			<View className="mt-4">
				<TouchableOpacity
					className="border border-blue-500 py-4 rounded-lg items-center"
					onPress={() => router.push("/(self)/new-address")}
				>
					<Text className="text-blue-500 text-lg font-medium">
						+ Add New Address
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default MyAddresses;
