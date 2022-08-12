import { TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, value, setState, password }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        setState(text);
      }}
      secureTextEntry={password ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    color: "#888888",
    marginTop: 25,
  },
});

export default CustomInput;
