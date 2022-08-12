import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

//imports package
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

//imports img
import LogoAirbnb from "../assets/img/logo.png";

//imports components
import CustomInput from "../components/CustomInput";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        if (response.data.token) {
          alert("Successful You're logged in!");
          setToken(response.data.token);
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
        }
      }
    } else {
      setErrorMessage("All fields are required.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.ScrollView}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Image style={styles.logo} source={LogoAirbnb} />
      <Text style={styles.titleSignup}>Sign In</Text>
      <CustomInput placeholder={"Email"} value={email} setState={setEmail} />

      <CustomInput
        placeholder={"Password"}
        value={password}
        setState={setPassword}
        password={password}
      />

      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity style={styles.buttonSignup} onPress={handleSubmit}>
        <Text style={styles.textButtonSignup}>Sign In</Text>
      </TouchableOpacity>

      <Text
        style={styles.goToSignin}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        No account ? Register.
      </Text>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: "white",
  },

  logo: {
    width: 150,
    height: 150,
    marginTop: 10,
  },

  titleSignup: {
    color: "#717171",
    fontWeight: "600",
    fontSize: 18,
  },

  descriptionInput: {
    width: "80%",
    height: 100,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    color: "#888888",
    marginTop: 25,
    paddingLeft: 10,
    paddingTop: 10,
  },

  buttonSignup: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#ED646B",
    height: 50,
    borderRadius: 10,
    marginTop: 15,
  },

  textButtonSignup: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  goToSignin: {
    marginTop: 5,
    color: "#717171",
  },

  errorMessage: {
    color: "#ED646B",
    marginTop: 20,
  },
});
