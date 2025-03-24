import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { MoreMenuItem } from "../types/type";

const MoreMenuItemCard = ({ icon, label, onPress }: MoreMenuItem) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white"
    >
      <View className="flex-row items-center space-x-3">
        {/* Icon wrapper for white rounded square background */}
        <View className="w-10 h-10 mr-4 bg-[#F5F9FC] rounded-[10px] justify-center items-center">
          {icon}
        </View>
        <Text className="text-base text-gray-800">{label}</Text>
      </View>
    </Pressable>
  );
};

export default MoreMenuItemCard;
