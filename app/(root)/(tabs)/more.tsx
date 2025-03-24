import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import MoreMenuItemCard from "../../../components/MoreMenuItemCard";
import ProfileIcon from "../../../assets/images/Profile.png";
import Orders from "../../../assets/images/Orders.png";
import Language from "../../../assets/images/language.png";
import Address from "../../../assets/images/Address.png";
import Wallet from "../../../assets/images/Wallet.png";
import Visits from "../../../assets/images/visits.png";
import Consults from "../../../assets/images/consult.png";
import Contact from "../../../assets/images/contact.png";
import Subscribe from "../../../assets/images/subscriptions.png";
import Invite from "../../../assets/images/invite.png";
import Logout from "../../../assets/images/logout.png";
import Points from "../../../assets/images/points.png";

const MoreScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        className="flex-1"
      >
        {/* Header Background */}
        <ImageBackground
          source={require("../../../assets/images/textured_background.png")}
          resizeMode="cover"
          className="w-full h-[220px] rounded-b-3xl px-4 pt-10"
        >
          <View
            className="absolute flex-row items-center justify-between"
            style={{ width: 355, height: 60, top: 78, left: 18 }}
          >
            <Pressable
              onPress={() => router.push("/personal-profile")}
              className="flex-row items-center space-x-3 gap-3 mt-1"
            >
              <Image
                source={{
                  uri: "https://cdn.rafled.com/anime-icons/images/106a77473c37d92c06cb28f410b433a82979f3045c8442300e894ad89f65c01a.jpg",
                }}
                className="w-[60px] h-[60px] rounded-full border-[3px] border-white"
              />
              <View className="w-[114px] h-[44px] justify-center space-y-[5px]">
                <Text className="text-white font-semibold text-base">
                  Test Test
                </Text>
                <Text className="text-white text-sm">test@gmail.com</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.push("/personal-profile")}
              style={{
                width: 59,
                height: 28,
                borderRadius: 25,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "400",
                  lineHeight: 13,
                  textAlign: "center",
                  color: "#FFFFFF",
                }}
              >
                Edit
              </Text>
            </Pressable>
          </View>
        </ImageBackground>

        {/* Cards Section */}
        <View className="items-center -mt-[60px]">
          {/* Card 1 */}
          <View
            className="w-[358px] bg-white rounded-[12px] p-5 space-y-[15px]"
            style={{
              shadowColor: "#5A75A7",
              shadowOpacity: 0.04,
              shadowOffset: { width: 2, height: 12 },
              shadowRadius: 20,
              elevation: 5,
            }}
          >
            <MoreMenuItemCard
              icon={
                <Image
                  source={ProfileIcon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="Personal Profile"
              onPress={() => router.push("/(more)/personal-profile")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Orders}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="My Orders"
              onPress={() => router.push("/(more)/orders")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Language}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="Change Language"
              onPress={() => router.push("/(more)/language")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Address}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="My Addresses"
              onPress={() => router.push("/(more)/addresses")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Wallet}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="My Wallet"
              onPress={() => router.push("/(more)/wallet")}
            />
          </View>

          {/* Card 2 */}
          <View
            className="w-[358px] mt-3 bg-white rounded-[12px] mb-14 p-5 space-y-[15px]"
            style={{
              shadowColor: "#5A75A7",
              shadowOpacity: 0.04,
              shadowOffset: { width: 2, height: 12 },
              shadowRadius: 20,
              elevation: 5,
            }}
          >
            <MoreMenuItemCard
              icon={
                <Image
                  source={Visits}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="My Visits"
              onPress={() => router.push("/(more)/visits")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Consults}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="My Consultations"
              onPress={() => router.push("/(more)/consultations")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Points}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="My Points"
              onPress={() => router.push("/(more)/points")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Contact}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="Contact Us"
              onPress={() => router.push("/(more)/contact")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Subscribe}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="Subscriptions"
              onPress={() => router.push("/(more)/subscriptions")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Invite}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="Invite Friends"
              onPress={() => router.push("/(more)/invite")}
            />
            <MoreMenuItemCard
              icon={
                <Image
                  source={Logout}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              label="Log out"
              onPress={() => router.push("/(more)/logout")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;
