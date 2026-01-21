import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native'
import { logout } from '../../../utils/AsyncStorage';

const profile = () => {
  const router = useRouter();
  return (
    <View>
        <Text>profile</Text>
        <Text> Profile Page is still under development but check out not found page </Text>
        <TouchableOpacity onPress={() => router.push('/+not-found')} >
            <Text>Go to Not Found Page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout().then(() => router.replace('/auth'))} >
            <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default profile
