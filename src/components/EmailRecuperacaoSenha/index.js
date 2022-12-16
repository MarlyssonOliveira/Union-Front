import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useState } from 'react';
import axios from "axios";

export default function EmailRecuperacaoSenha({navigation}) {

    const [Email,setEmail] = useState();

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    
      function EnviaEmail(){
        axios.post(global.baseURL+":8080/union/user/request-new-password",Email,{headers:{'Content-Type': 'text/html'}})
        .then((response)=>{
            navigation.navigate("NovaSenha")
        }).catch((err)=>{
            console.log(err)
        })
      }
      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <View style={{paddingHorizontal:15}}>
                <Icon
                    name="email-alert"
                    type='material-community'
                    color="#1DB954"
                    size={200}
                />

                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.titulos.titulo}>Para redefinir sua senha, informe seu email.</Text>
                    <Text style={styles.titulos.subtitulo}>enviaremos um codigo de confirmação para prosseguir.</Text>
                </View>
                <View style={styles.divInput.align}>
                    <Input
                        placeholder='Digite o seu email...'
                        inputContainerStyle={styles.divInput.inputcontainerStyle}
                        onChangeText={(email)=>{setEmail(email)}}
                        inputStyle={styles.divInput.inputStyle}
                        containerStyle={styles.divInput.ContainerStyle}
                        style={styles.divInput.style}
                    />
                </View>
            </View>

            <View style={styles.divButtons.alignment}>
                <Button
                    buttonStyle= {styles.divButtons.buttonEnviarStyle}
                    style={styles.divButtons.style}
                    title="Enviar código"
                    onPress={()=>{EnviaEmail()}}
                    raised="true"
                    containerStyle={styles.divButtons.containerStyle}
                    titleStyle={styles.divButtons.titleEnviarStyle}
                    />
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
            width: 350, 
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
        buttonEnviarStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            width: 350
        },
        containerStyle:{
            borderRadius:10,
            width: 340
        },
        titleEnviarStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        },
        titleReenviarStyle:{
            color:"#ADADAD", 
            fontFamily:"PoppinsExtraBold"
        }
    }
});