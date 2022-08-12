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
import { FontAwesome } from "@expo/vector-icons";

export default function RoomScreen({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  // console.log(data.photos[0].url);
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
    <View style={styles.mainHome}>
      <ImageBackground
        style={styles.imgCardHome}
        source={{ uri: data.photos[0].url }}
      >
        <View style={styles.contentPrice}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </ImageBackground>

      <View style={styles.description}>
        <View style={styles.textDescription}>
          <Text numberOfLines={1} style={styles.titleDescription}>
            {data.title}
          </Text>
          <View style={styles.detailsDescription}>
            <View style={styles.stars}>{displayStars(data.ratingValue)}</View>
            <View>
              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
        </View>

        <Image
          style={styles.avatar}
          source={{ uri: data.user.account.photo.url }}
        />
      </View>
      <View style={styles.line}></View>
    </View>
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
