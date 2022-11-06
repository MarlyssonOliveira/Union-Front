import { StyleSheet, Text, View } from 'react-native';
import CadastroDados from './src/components/CadastroDados';
import CadastroSeguranca from './src/components/CadastroSeguranca';
import Home from './src/components/Home';
import Index from './src/components/Index/index';
import Login from './src/components/Login';

export default function App() {
  return (
    <View style={styles.container}>
      <Home></Home>
    </View>
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
