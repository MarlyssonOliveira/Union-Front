import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import AdmCondominio from './src/components/AdmCondominio';
import CadastroDados from './src/components/CadastroDados';
import CadastroSeguranca from './src/components/CadastroSeguranca';
import CodigoVerificacao from './src/components/CodigoVerificacao';
import CondominioMorador from './src/components/CondominioMorador';
import Confirmacao from './src/components/Confirmacao';
import Debitos from './src/components/Debitos';
import ErroCadastro from './src/components/ErroCadastro';
import Home from './src/components/Home';
import Index from './src/components/Index/index';
import ListaCondominios from './src/components/ListaCondominios';
import Login from './src/components/Login';
import NovaMensagem from './src/components/NovaMensagem';
import NovaTaxa from './src/components/NovaTaxa';
import NovoCondominio from './src/components/NovoCondominio';
import SucessoCadastro from './src/components/SucessoCadastro';
import StackNavigator from './src/components/Navigator/stackNavigator'
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  global.baseURL = "http://192.168.0.105"
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
