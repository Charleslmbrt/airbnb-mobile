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

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          if (response.data.token) {
            alert("Successful registration");
            setToken(response.data.token);
          }
        } catch (error) {
          console.log(error.response.data);
          if (error.response.data) {
            setErrorMessage(error.response.data.error);
          }
        }
      } else {
        setErrorMessage("Your passwords are not identical");
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
      <Text style={styles.titleSignup}>Sign Up</Text>
      <CustomInput placeholder={"Email"} value={email} setState={setEmail} />
      <CustomInput
        placeholder={"Username"}
        value={username}
        setState={setUsername}
      />

      <TextInput
        multiline={true}
        placeholder="Describe yourself in a few words..."
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
        style={styles.descriptionInput}
      />

      <CustomInput
        placeholder={"Password"}
        value={password}
        setState={setPassword}
        password={password}
      />

      <CustomInput
        placeholder={"Confirme Password"}
        value={confirmPassword}
        setState={setConfirmPassword}
        password={password}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity style={styles.buttonSignup} onPress={handleSubmit}>
        <Text style={styles.textButtonSignup}>Sign up</Text>
      </TouchableOpacity>

      <Text
        style={styles.goToSignin}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        Already have an account ? Sign in.
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
