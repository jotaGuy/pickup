import { Platform, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <Formik
      initialValues={{
        location: "",
        playersConfirmed: "",
        fullCourt: false,
        playersNeeded: "",
        createdTime: "",
        updatedTime: "",
      }}
      onSubmit={(values) => {
        fetch("http://localhost:8080/Listings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Listing created successfully");
            } else {
              throw new Error("Failed to create listing");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            onChangeText={handleChange("location")}
            onBlur={handleBlur("location")}
            value={values.location}
            placeholder="Location"
          />
          <TextInput
            onChangeText={handleChange("playersConfirmed")}
            onBlur={handleBlur("playersConfirmed")}
            value={values.playersConfirmed}
            placeholder="Players Confirmed"
            keyboardType="numeric"
          />
          <TextInput
            onChangeText={handleChange("playersNeeded")}
            onBlur={handleBlur("playersNeeded")}
            value={values.playersNeeded}
            placeholder="Players Needed"
            keyboardType="numeric"
          />
          <TextInput
            onChangeText={handleChange("createdTime")}
            onBlur={handleBlur("createdTime")}
            value={values.createdTime}
            placeholder="Created Time"
            keyboardType="numeric"
          />
          <TextInput
            onChangeText={handleChange("updatedTime")}
            onBlur={handleBlur("updatedTime")}
            value={values.updatedTime}
            placeholder="Updated Time"
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
