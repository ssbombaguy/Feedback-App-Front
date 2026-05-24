import { StyleSheet } from 'react-native';

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    header: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      letterSpacing: 0.5,
      alignSelf: "center",
    },
    subtitle: {
      fontSize: 14,
      color: theme.subtext,
      marginTop: 4,
      alignSelf: "center",
    },
  });
