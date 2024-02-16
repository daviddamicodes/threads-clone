import { Text, View } from "@/components/Themed";
import { BottomIcons, PostFooter } from "@/components/thread-item";
import { blurHash } from "@/constants";
import { ThreadContext } from "@/context/thread-context";
import { timeAgo } from "@/helpers";
import { Thread } from "@/types/threads";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useRef } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Lottie from "lottie-react-native";

const ThreadPage = () => {
  const animationRef = useRef<Lottie>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const threads = useContext<Thread[]>(ThreadContext);
  const thread = threads.find((thread) => thread.id === id);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => animationRef.current?.play()}
            tintColor="transparent"
          />
        }
      >
        <Lottie
          ref={animationRef}
          source={require("../../animations/threads-animation.json")}
          loop={false}
          autoPlay
          style={{ height: 90, width: 90, alignSelf: "center" }}
          // onAnimationFinish={() => alert("Finished")}
        />
        {thread && (
          <View style={styles.container}>
            {/* <PostThread {...thread} /> */}
            <View
              style={{
                gap: 6,
                // flexShrink: 1
              }}
            >
              <PostHeading
                name={thread.author.name}
                photo={thread.author.photo}
                createdAt={thread.createdAt}
                verified={thread.author.verified}
              />
              {/* <Text style={{ opacity: 0.6 }}>{thread.author.username}</Text> */}
              <Text style={{ marginBottom: 6 }}>{thread.content}</Text>
              {thread.image && (
                <Image
                  source={thread.image}
                  style={{ width: "100%", minHeight: 300, borderRadius: 10 }}
                  placeholder={blurHash}
                  contentFit="cover"
                  transition={200}
                />
              )}
              <BottomIcons />
              <PostFooter
                repliesCount={thread.repliesCount}
                likesCount={thread.likesCount}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThreadPage;

const PostHeading = ({
  name,
  photo,
  createdAt,
  verified,
}: {
  name: string;
  photo: string;
  createdAt: string;
  verified: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
        marginBottom: 8,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={photo}
          style={styles.image}
          placeholder={blurHash}
          contentFit="cover"
          transition={500}
        />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontWeight: "500" }}>{name}</Text>
          {verified && (
            <MaterialIcons name="verified" size={14} color="#60a5fa" />
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
