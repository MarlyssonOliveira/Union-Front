import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/components/Navigator/stackNavigator'
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  global.baseURL = "http://ec2-54-236-227-231.compute-1.amazonaws.com:8080"
  global.genericUserUrl = "https://union-profile-images.s3.amazonaws.com/photo-default-user"
  global.genericBuildingUrl = "https://union-profile-images.s3.amazonaws.com/photo-default-condominium"

  return (
      <NavigationContainer>
        <StackNavigator></StackNavigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
