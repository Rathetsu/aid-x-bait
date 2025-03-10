import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/store/hooks";
import SignOutButton from "@/components/SignOutButton";

const More = () => {
  const user = useAppSelector((state) => state.user.user);

  // Placeholder data if user data is not available
  const placeholderUser = {
    name: "Yosra Allam",
    email: "yosra@gmail.com",
    profilePicture: require('@/assets/default-profile-picture.png') // Replace with your default profile picture path
  };

  const options = [
    { icon: require('@/assets/icons/personal-profile-placeholder.png'), label: 'Personal Profile' },
    { icon: require('@/assets/icons/my-orders-placeholder.png'), label: 'My Orders' },
    { icon: require('@/assets/icons/change-language-placeholder.png'), label: 'Change Language' },
    { icon: require('@/assets/icons/my-wallet-placeholder.png'), label: 'My Wallet' },
  ];

  const additionalOptions = [
    { icon: require('@/assets/icons/my-visits-placeholder.png'), label: 'My Visits' },
    { icon: require('@/assets/icons/my-consultations-placeholder.png'), label: 'My Consultations' },
    { icon: require('@/assets/icons/my-points-placeholder.png'), label: 'My Points' },
    { icon: require('@/assets/icons/subscriptions-placeholder.png'), label: 'Subscriptions' },
    { icon: require('@/assets/icons/invite-friends-placeholder.png'), label: 'Invite Friends' },
    { icon: require('@/assets/icons/log-out-placeholder.png'), label: 'Log out' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-500 h-32 flex-row items-center px-4">
        <Image
          source={}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-white text-lg font-bold">{user?.name || placeholderUser.name}</Text>
          <Text className="text-white">{user?.email || placeholderUser.email}</Text>
        </View>
        <TouchableOpacity className="ml-auto bg-gray-200 px-4 py-1 rounded-full">
          <Text className="text-blue-500">Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View className="mt-4 mx-4">
        {options.map((option, index) => (
          <TouchableOpacity key={index} className="flex-row items-center p-4 bg-white border-b border-gray-200">
            <Image source={option.icon} className="w-6 h-6 mr-4" />
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Options */}
      <View className="mt-4 mx-4">
        {additionalOptions.map((option, index) => (
          <TouchableOpacity key={index} className="flex-row items-center p-4 bg-white border-b border-gray-200">
            <Image source={option.icon} className="w-6 h-6 mr-4" />
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default More;