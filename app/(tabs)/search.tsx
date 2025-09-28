import MovieCard from "@/components/MovieCard";
import SearchBox from "@/components/SearchBox";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const func = async () => {
        if (searchQuery.trim()) {
          await loadMovies();
        } else {
          reset();
        }
      };
      func();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32"
          scrollEnabled={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row items-center justify-center mt-20">
                <Image source={icons.logo} className="w-12 h-10" />
              </View>
              <View className="my-5">
                <SearchBox
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                  placeholder="Search movies......"
                />
              </View>
              {moviesLoading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-10 self-center"
                />
              )}
              {moviesError && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {moviesError.message}
                </Text>
              )}
              {!moviesLoading &&
                !moviesError &&
                searchQuery.trim() &&
                movies?.length! > 0 && (
                  <Text className="text-white font-bold my-5">
                    Search Results for{" "}
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                )}
            </>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim()
                    ? "No movies found"
                    : "Search for a movie"}
                </Text>
              </View>
            ) : null
          }
        />
      </ScrollView>
    </View>
  );
}
