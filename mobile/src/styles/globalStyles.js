import { StyleSheet } from "react-native";
import colors from '../constants/colors';
import fonts from "../constants/fonts";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  title: {
    color: colors.pink,
    fontSize: fonts.size.xl,
  },
  buttonText: {
    color: colors.grey,
    fontSize: fonts.size.m
  }
});
