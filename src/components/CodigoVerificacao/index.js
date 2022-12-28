import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useState } from 'react';
import axios from "axios";

export default function CodigoVerificacao({navigation}) {

    const [Codigo,setCodigo] = useState();

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    
      function VerificaCodigo(){
        axios.post(global.baseURL+":8080/union/user/account-confirmation",Codigo,{headers:{'Content-Type': 'application/json'}})
        .then((response)=>{
            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: true,
                mensagem : "Cadastro Realizado com Sucesso!",
                textoBotao : "Ir para Login",
                destinoBotao : "Login"
            })
        }).catch((error)=>{
            if(error.response != undefined){
                console.log(error.response.data.message)
            }
            navigation.navigate("Feedback", {
                tipo : false,
                retornoEspecifico: true,
                mensagem : "Ocorreu um erro inesperado no sistema!",
                textoBotao : "Inicio",
                destinoBotao: "Index"
            })
        })
      }
      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <View style={{paddingHorizontal:15}}>
                <Icon
                    name="email-fast"
                    type='material-community'
                    color="#1DB954"
                    size={200}
                />

                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.titulos.titulo}>Um código foi enviado para o email informado</Text>
                    <Text style={styles.titulos.subtitulo}>Para continuar informe o codigo abaixo</Text>
                </View>
                <View style={styles.divInput.align}>
                    <Input
                        placeholder='00-00-00-00'
                        inputContainerStyle={styles.divInput.inputcontainerStyle}
                        onChangeText={(codigo)=>{setCodigo(codigo)}}
                        inputStyle={styles.divInput.inputStyle}
                        containerStyle={styles.divInput.ContainerStyle}
                        style={styles.divInput.style}
                    />
                </View>
            </View>

            <View style={styles.divButtons.alignment}>
                <Button
                    buttonStyle= {styles.divButtons.buttonVerificarStyle}
                    style={styles.divButtons.style}
                    title="Verificar código"
                    onPress={()=>{VerificaCodigo()}}
                    raised="true"
                    containerStyle={styles.divButtons.containerStyle}
                    titleStyle={styles.divButtons.titleVerificarStyle}
                    />
                {/* <Button
                    buttonStyle= {styles.divButtons.buttonReenviarStyle}
                    type="outline"
                    raised="true"
                    containerStyle={styles.divButtons.containerStyle}
                    title="Reenviar código"
                    titleStyle={styles.divButtons.titleReenviarStyle}
                /> */}
            </View>
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
    conteudo:{
        paddingHorizontal: 15
    },

    titulos:{
        titulo:{
            fontSize: 25,
            marginTop:50, 
            fontFamily:"PoppinsExtraBold", 
            textAlign: 'center'
        },
        subtitulo:{
            fontSize: 14, 
            fontFamily:"PoppinsRegular", 
            color:"#ADADAD", 
            textAlign: 'center'
        }
    },

    divInput:{
        align:{
            alignSelf:'center', 
            marginTop:15
        },

        inputStyle:{
            fontFamily:"PoppinsSemiBold",
            height: 50
        },
        inputcontainerStyle:{
            borderBottomWidth: 0
        },
        ContainerStyle:{
            width: 250, 
            backgroundColor:"#F0F1F5", 
            borderRadius: 10, 
            height: 50
        },
        style:{
            alignSelf:"center", 
            textAlign: 'center'
        }
    },

    divButtons:{
        alignment:{
            height:120, 
            justifyContent: 'space-between'
        },
        style:{
            alignSelf:"center"
        },
        buttonVerificarStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            width: 350
        },
        buttonReenviarStyle:{
            backgroundColor: "#fff",
            borderRadius:10,
            width: 340,
            borderColor:"#ADADAD",
            borderWidth: 1
        },
        containerStyle:{
            borderRadius:10,
            width: 340
        },
        titleVerificarStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        },
        titleReenviarStyle:{
            color:"#ADADAD", 
            fontFamily:"PoppinsExtraBold"
        }
    }
});