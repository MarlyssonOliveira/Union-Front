import { createStackNavigator } from '@react-navigation/stack';
import AdmCondominio from '../AdmCondominio/index';
import AletrarImgCondominio from '../AlterarImgCondominio';
import AletrarImgUsuario from '../AlterarImgUsuario';
import CadastroDados from '../CadastroDados/index';
import CadastroSeguranca from '../CadastroSeguranca/index';
import CodigoVerificacao from '../CodigoVerificacao/index';
import CondominioMorador from '../CondominioMorador/index';
import Confirmacao from '../Confirmacao/index';
import ConfirmacaoLogout from '../ConfirmacaoLogout/ConfirmacaoLogout';
import ConfirmacaoSairCondominio from '../ConfirmacaoSairCondominio';
import CSVCondominio from '../CSVCondominio';
import Debitos from '../Debitos/index';
import DetalhamentoTaxa from '../DetalhamentoTaxa';
import EmailRecuperacaoSenha from '../EmailRecuperacaoSenha';
import Feedback from '../Feedback';
import GerenciamentoTaxas from '../GerenciamentoTaxas';
import Home from '../Home/index';
import Index from '../Index/index';
import ListaCondominios from '../ListaCondominios/index';
import ListaMoradores from '../ListaMoradores';
import Login from '../Login/index';
import NovaMensagem from '../NovaMensagem/index';
import NovaSenha from '../NovaSenha';
import NovaTaxa from '../NovaTaxa/index';
import NovoCondominio from '../NovoCondominio/index';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Index'>
    <Stack.Screen name="Index" component={Index} options={{headerShown:false}}/>
    <Stack.Screen name="CadastroDados" component={CadastroDados} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="CadastroSeguranca" component={CadastroSeguranca} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="CodigoVerificacao" component={CodigoVerificacao} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="Feedback" component={Feedback} options={{headerShown:false, headerTitle:""}}/>
    <Stack.Screen name="CSVCondominio" component={CSVCondominio} options={{headerShown:false, headerTitle:""}}/>
    <Stack.Screen name="Login" component={Login} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="Home" component={Home} options={{headerShown:false, headerTitle:""}}/>
    <Stack.Screen name="CondominioMorador" component={CondominioMorador} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="ListaMoradores" component={ListaMoradores} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="AdmCondominio" component={AdmCondominio} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="NovaTaxa" component={NovaTaxa} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="NovaMensagem" component={NovaMensagem} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="Confirmacao" component={Confirmacao} options={{headerShown:false, headerTitle:""}}/>
    <Stack.Screen name="NovoCondominio" component={NovoCondominio} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="Debitos" component={Debitos} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="GerenciamentoTaxas" component={GerenciamentoTaxas} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="DetalhamentoTaxa" component={DetalhamentoTaxa} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="ListaCondominios" component={ListaCondominios} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="EmailRecuperacaoSenha" component={EmailRecuperacaoSenha} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="NovaSenha" component={NovaSenha} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="AletrarImgCondominio" component={AletrarImgCondominio} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="AletrarImgUsuario" component={AletrarImgUsuario} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="ConfirmacaoLogout" component={ConfirmacaoLogout} options={{headerShown:true, headerTitle:""}}/>
    <Stack.Screen name="ConfirmacaoSairCondominio" component={ConfirmacaoSairCondominio} options={{headerShown:true, headerTitle:""}}/>


  </Stack.Navigator>
  );
}