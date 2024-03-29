import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from "axios";
import * as Progress from 'react-native-progress'

export default function EmailRecuperacaoSenha({navigation}) {

    const [Email,setEmail] = useState();
    const [erroEmail,setErroEmail] = useState();
    const [validar, setValidar] = useState(false);
    const [spin, setSpin] = useState(false);

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });

    function validarCampos(){
        if(erroEmail==''){
            setValidar(true);
        }else{
            setValidar(false)
        }
    }

    function validadorEmail(email){
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(email=="" || !regex.test(email)){
            setErroEmail('Preencha corretamente')
        }else{
            setErroEmail('')
        }
    }

    useEffect(()=>{
        validarCampos()
    })
    
      function EnviaEmail(){
        if(validar){
            setSpin(true)
            axios.post(global.baseURL+"/union/user/request-new-password",Email,{headers:{'Content-Type': 'text/html'}})
        .then((response)=>{
            setSpin(false)
            navigation.navigate("NovaSenha")
        }).catch((error)=>{
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
                        onChangeText={(email)=>{
                            setEmail(email)
                            validadorEmail(email);
                        }}
                        inputStyle={styles.divInput.inputStyle}
                        containerStyle={styles.divInput.ContainerStyle}
                        style={styles.divInput.style}
                        errorMessage={erroEmail}
                    />
                </View>
            </View>

            <View style={styles.divButtons.alignment}>
                <Button
                    buttonStyle= {styles.divButtons.buttonEnviarStyle}
                    style={styles.divButtons.style}
                    title={spin != false ?
                        <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} />: 'Enviar código'}
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
            justifyContent: 'flex-end'
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
            width: 350
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