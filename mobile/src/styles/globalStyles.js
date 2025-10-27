import { StyleSheet } from "react-native";
import colors from '../constants/colors';
import fonts from "../constants/fonts";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    width: '100%',
    paddingTop: 22,
  },
  title: {
    color: colors.pink,
    fontSize: fonts.size.xl,
  },
  subText: {
    fontSize: fonts.size.xsm,
    color: colors.white2,
    marginTop: 4,
  },
  buttonText: {
    color: colors.grey,
    fontSize: fonts.size.m
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginTop: 4,
    backgroundColor: colors.pink,
    minWidth: 0,
  },
  badgeText: {
    color: colors.white,
    flexShrink: 1,
    fontSize: fonts.size.xsm
  },
  searchBarToggle: {
        width: '100%',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 10,
        zIndex: 10,
  },
});
