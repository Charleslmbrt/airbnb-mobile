import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

//imports img/icons
import LogoAirbnb from "../assets/img/logo.png";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const displayStars = (numberOfStars) => {
    const tabStars = [];
    for (let i = 0; i < 5; i++) {
      if (i < numberOfStars) {
        tabStars.push(
          <FontAwesome
            name="star"
            size={20}
            color="#FFB100"
            style={{ marginRight: 5 }}
          />
        );
      } else {
        tabStars.push(<FontAwesome name="star" size={20} color="#BBBBBB" />);
      }
    }
    return tabStars;
  };

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <>
      {/* <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */}

      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(elem) => elem._id}
        renderItem={({ item }) => {
          // console.log(item.user.account.photo.url);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              <View style={styles.mainHome}>
                <ImageBackground
                  style={styles.imgCardHome}
                  source={{ uri: item.photos[0].url }}
                >
                  <View style={styles.contentPrice}>
                    <Text style={styles.price}>{item.price} €</Text>
                  </View>
                </ImageBackground>

                <View style={styles.description}>
                  <View style={styles.textDescription}>
                    <Text numberOfLines={1} style={styles.titleDescription}>
                      {item.title}
                    </Text>
                    <View style={styles.detailsDescription}>
                      <View style={styles.stars}>
                        {displayStars(item.ratingValue)}
                      </View>
                      <View>
                        <Text style={styles.reviews}>
                          {item.reviews} reviews
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Image
                    style={styles.avatar}
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
                <View style={styles.line}></View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    paddingBottom: 30,
  },

  mainHome: {
    marginHorizontal: 20,
  },

  flatList: {
    backgroundColor: "white",
  },

  logo: {
    width: 90,
    height: 90,
    marginTop: 10,
  },

  imgCardHome: {
    flex: 1,
    height: 180,
    marginTop: 30,
    justifyContent: "flex-end",
  },

  description: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },

  titleDescription: {
    marginVertical: 10,
    fontSize: 15,
  },

  detailsDescription: {
    flexDirection: "row",
    alignItems: "center",
  },

  reviews: {
    marginLeft: 10,
    color: "#BBBBBB",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 15,
  },

  contentPrice: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: 45,
    marginBottom: 20,
  },

  price: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  stars: {
    flexDirection: "row",
  },

  line: {
    height: 1,
    backgroundColor: "#E7E7E7",
    marginTop: 13,
  },
});
