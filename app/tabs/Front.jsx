import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import PostList from "../../components/PostList";
import { postService } from "@/services/postService";

export default function Front() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const posts = await postService();
        setData(posts);
        setLoading(false);
      } catch (e) {
        setLoading(true);
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size="large" /> : <Text></Text>}
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Posts</Text>
      <PostList posts={data.posts} style={{ marginTop: 5, flex: 1 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 10,
  },
});
