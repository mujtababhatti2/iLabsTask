import { useField } from "formik";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface ErrorMessageProps {
  name: string;
}

function ErrorMessage({ name }: ErrorMessageProps) {
  const [, { error, touched }] = useField(name);

  if (!touched || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "#aa1616",
    fontSize: 12,
    marginLeft: 10,
    marginBottom:10
    // alignSelf: 'flex-end'
  },
});

export default ErrorMessage;
