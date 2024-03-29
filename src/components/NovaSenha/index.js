import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image, Input } from 'react-native-elements';
import { useState } from 'react';
import axios from "axios";
import * as Progress from 'react-native-progress'

export default function NovaSenha({navigation}) {

    const [Email,setEmail] = useState();
    const [Senha,setSenha] = useState();
    const [Codigo,setCodigo] = useState();
    const [spin, setSpin] = useState(false);

    function RedefinirSenha(){
        var novaSenhaObj = {
            "email": Email,
            "password": Senha,
            "code": Codigo
        }
        setSpin(true)
        axios.put(global.baseURL+"/union/user/new-password",novaSenhaObj,{headers:{'Content-Type': 'application/json'}})
        .then((response) => {
            setSpin(false)
            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: true,
                mensagem : "Senha redefinida com Sucesso!",
                textoBotao : "Ir para Login",
                destinoBotao : "Login"
            })
        }).catch((error) =>{
            setSpin(false)
            navigation.navigate("Feedback", {
                tipo : false,
                retornoEspecifico: true,
                mensagem : "Ocorreu um erro inesperado no sistema!",
                textoBotao : "Inicio",
                destinoBotao: "Index"
            })
        })

    }

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    
      if (!loaded) {
        return null;
      }



    return (
        <View style={styles.container}>
            <View style={{alignSelf:'flex-start', paddingStart:25}}>
                <Text style={{fontSize: 30, fontFamily:"PoppinsExtraBold"}}>Redefinição de Senha</Text>
            </View>
            
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>Email</Text>
                <Input
                    placeholder='Digite seu e-mail'
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={{fontFamily:"PoppinsRegular",height: 55}}
                    onChangeText={(email) => setEmail(email)}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                />
            </View>
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>Nova Senha</Text>
                <Input
                    placeholder='Digite sua nova senha'
                    secureTextEntry={true}
                    inputStyle={{fontFamily:"PoppinsRegular", height: 55}}
                    onChangeText={(senha) => setSenha(senha)}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10,height: 50}}
                    style={{alignSelf:"center"}}

                />
            </View>
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>Código de redefinição</Text>
                <Input
                    placeholder='Digite o código'
                    onChangeText={(codigo) => setCodigo(codigo)}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={{fontFamily:"PoppinsRegular",height: 55}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                />
            </View>
            <Button
                buttonStyle= {{
                    backgroundColor: "#1DB954",
                    borderRadius:10,
                    width: 350
                }}
                style={{alignSelf:"center"}}
                title={spin != false ?
                    <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} />: 'Redefinir Senha'}                raised="true"
                onPress={()=>{RedefinirSenha()}}
                containerStyle={{
                    borderRadius:10
                }}
                titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});