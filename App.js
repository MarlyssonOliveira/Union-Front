import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/components/Navigator/stackNavigator'
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  global.baseURL = "http://192.168.0.105:8080"
  global.genericUserUrl = "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
  global.genericBuildingUrl = "https://sonharemorar.com.br/wp-content/uploads/2020/12/condominio-1-750x490.jpg"

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
