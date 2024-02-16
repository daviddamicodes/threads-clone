import { timeAgo } from "@/helpers";
import { Thread } from "@/types/threads";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "./Themed";
import { blurHash } from "@/constants";
import { Link, router } from "expo-router";

const ThreadItem = (thread: Thread): JSX.Element => {
  const navigate = () => {
    router.push(`/${thread.id}`);
  };

  return (
    <Pressable onPress={navigate} style={{ width: "100%" }}>
      <View style={styles.container}>
        {/* <Text>{thread.author.username}</Text> */}
        <PostThread {...thread} />
        <View
          style={{
            gap: 6,
            // flexShrink: 1
          }}
        >
          <PostHeading
            name={thread.author.name}
            createdAt={thread.createdAt}
            verified={thread.author.verified}
          />
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
    </Pressable>
  );
};

export default ThreadItem;

const PostThread = (thread: Thread) => {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#00000020" : "#ffffff20";

  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurHash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor: thread.replies?.length ? borderColor : "transparent",
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: "center",
          alignSelf: "center",
          gap: 3,
        }}
      >
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            source={
              thread.replies ? thread.replies[index - 1]?.author.photo : null
            }
            style={{ width: index * 8, height: index * 8, borderRadius: 15 }}
            placeholder={blurHash}
            contentFit="cover"
            transition={500}
          />
        ))}
      </View>
    </View>
  );
};

const PostHeading = ({
  name,
  createdAt,
  verified,
}: {
  name: string;
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
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontWeight: "500" }}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
};

export const PostFooter = ({
  repliesCount,
  likesCount,
}: {
  repliesCount: number;
  likesCount: number;
}) => {
  return (
    <Text style={{ color: "gray" }}>
      {repliesCount} replies · {likesCount} likes
    </Text>
  );
};

export const BottomIcons = () => {
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginVertical: 10,
      }}
    >
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
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
