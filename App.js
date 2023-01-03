import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/components/Navigator/stackNavigator'
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  global.baseURL = "http://192.168.100.238"
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
