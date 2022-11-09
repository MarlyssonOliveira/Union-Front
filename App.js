import { StyleSheet, Text, View } from 'react-native';
import CadastroDados from './src/components/CadastroDados';
import CadastroSeguranca from './src/components/CadastroSeguranca';
import CondominioMorador from './src/components/CondominioMorador';
import Confirmacao from './src/components/Confirmacao';
import ErroCadastro from './src/components/ErroCadastro';
import Home from './src/components/Home';
import Index from './src/components/Index/index';
import Login from './src/components/Login';
import SucessoCadastro from './src/components/SucessoCadastro';

export default function App() {
  return (
    <View style={styles.container}>
      <CondominioMorador></CondominioMorador>
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
