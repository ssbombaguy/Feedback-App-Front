import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { isLoggedIn } from "../utils/AsyncStorage";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const value = await isLoggedIn();
      setLoggedIn(value === "true");
    };

    checkAuth();
  }, []);

  if (loggedIn === null) return null;

  return loggedIn ? (
    <Redirect href="/(tabs)/(feedback)" />
  ) : (
    <Redirect href="/auth" />
  );
}
