import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Lottie from "lottie-react-native";
import { useContext, useRef } from "react";
import { ThreadContext } from "@/context/thread-context";
import ThreadItem from "@/components/thread-item";

export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);
  const threads = useContext(ThreadContext);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30 }),
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
        {threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
