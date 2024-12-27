import React, { FC, useMemo } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
} from "react-native";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
	incrementQuantity,
	decrementQuantity,
	removeItem,
	applyDiscountCode,
} from "@/store/slices/cartSlice";
import { CartItem } from "@/types/type";

const Cart: FC = () => {
	const dispatch = useAppDispatch();
	const { items, discountCode, discountAmount, deliveryFee } = useAppSelector(
		(state) => state.cart
	);

	const subtotal = useMemo(() => {
		return items.reduce((sum: number, item: CartItem): number => {
			return sum + item.price * item.quantity;
		}, 0);
	}, [items]);

	// Memoized total amount calculation
	const totalAmount = useMemo(
		() => subtotal - discountAmount + deliveryFee,
		[subtotal, discountAmount, deliveryFee]
	);

	const renderItem = ({ item }: { item: CartItem }) => (
		<View className="flex-row justify-between items-center border-b border-gray-200 py-2">
			<View>
				<Text className="text-lg font-medium">{item.name}</Text>
				<Text className="text-gray-500">
					{item.price} {item.currency}
				</Text>
			</View>
			<View className="flex-row items-center space-x-2">
				<TouchableOpacity
					className="bg-blue-200 rounded-full px-2 py-1"
					onPress={() => dispatch(decrementQuantity(item.id))}
				>
					<Text>-</Text>
				</TouchableOpacity>
				<Text>{item.quantity}</Text>
				<TouchableOpacity
					className="bg-blue-200 rounded-full px-2 py-1"
					onPress={() => dispatch(incrementQuantity(item.id))}
				>
					<Text>+</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
				<Text className="text-red-500">Delete</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View className="flex-1 p-4 bg-white">
			{/* Header */}
			<View className="flex-row justify-between items-center">
				<Text className="text-xl font-semibold">Cart</Text>
				<Text className="text-blue-500">{items.length} Items</Text>
			</View>

			{/* Product List */}
			<FlatList
				data={items}
				keyExtractor={(item: CartItem) => item.id.toString()}
				renderItem={renderItem}
				className="mt-4"
			/>

			{/* Discount Code */}
			<View className="mt-4 p-4 border border-dashed border-gray-300 rounded">
				<Text className="text-lg font-medium">Do You Have Discount Code?!</Text>
				<View className="flex-row items-center mt-2 space-x-2">
					<TextInput
						className="flex-1 border rounded px-3 py-2 border-gray-300"
						placeholder="Enter Code"
						value={discountCode}
						onChangeText={(code) => dispatch(applyDiscountCode(code.trim()))}
					/>
					<TouchableOpacity
						className="bg-blue-500 px-4 py-2 rounded"
						onPress={() => {
							if (discountCode.trim()) {
								dispatch(applyDiscountCode(discountCode));
							} else {
								alert("Please enter a valid discount code.");
							}
						}}
					>
						<Text className="text-white">Apply</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Payment Summary */}
			<View className="mt-6 p-4 bg-gray-100 rounded">
				<Text className="text-lg font-medium">Payment Summary</Text>
				<View className="flex-row justify-between mt-2">
					<Text className="text-gray-500">Subtotal</Text>
					<Text>{subtotal} E.L</Text>
				</View>
				<View className="flex-row justify-between mt-2">
					<Text className="text-gray-500">Coupon Discount</Text>
					<Text>{discountAmount} E.L</Text>
				</View>
				<View className="flex-row justify-between mt-2">
					<Text className="text-gray-500">Delivery Fee</Text>
					<Text>{deliveryFee} E.L</Text>
				</View>
				<View className="flex-row justify-between mt-4">
					<Text className="text-lg font-semibold">Total Amount</Text>
					<Text className="text-blue-500 text-lg font-semibold">
						{totalAmount} E.L
					</Text>
				</View>
			</View>

			{/* Checkout Button */}
			<TouchableOpacity className="bg-blue-500 mt-4 py-3 rounded flex-row justify-center">
				<Text className="text-white text-lg font-medium">Check Out</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Cart;
