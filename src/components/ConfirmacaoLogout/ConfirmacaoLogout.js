import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';

export default function ConfirmacaoLogout({navigation}) {
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

    });

    if (!loaded) {
        return null;
    }

    function Logout(){
        axios.post(global.baseURL+"/union/user/logout",null,{headers:{'Content-Type': 'application/json', 'token': global.sessionID}})
        .then(() =>{
            global.sessionID = ""
            navigation.navigate("Index")
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
    return (
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
            <Icon
                name="alert-outline"
                type='material-community'
                color="#E91429"
                size={200}
            />
            
                <Text style={styles.icon.titulo}>Deseja encerrar a sessão?</Text>
            </View>
            <View style={styles.buttons.flex}>
                <Button
                    buttonStyle= {styles.buttons.buttonConfirmarStyle}
                    style={{alignSelf:"center"}}
                    title="Confirmar Logout!"
                    onPress={()=>Logout()}
                    raised="true"
                    containerStyle={styles.buttons.containerStyle}
                    titleStyle={{}}
                />
                <Button
                    buttonStyle= {styles.buttons.buttonCancelarStyle}
                    type="outline"
                    raised="true"
                    containerStyle={styles.buttons.containerStyle}
                    onPress={()=>navigation.goBack()}
                    title="Cancelar"
                    titleStyle={styles.buttons.titleCancelarStyle}
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
    icon:{
        titulo:{
            fontSize: 30,
            marginTop:50, 
            fontFamily:"PoppinsExtraBold", 
            textAlign: 'center'
        },
        subtitulo:{
            fontSize: 15, 
            fontFamily:"PoppinsMedium"
        },
        nomeCondominio:{
            fontSize: 16,
            fontFamily:"PoppinsExtraBold", 
            color:"#E91429",

        }
        
    },
    buttons:{
        flex:{
            height:125, 
            justifyContent:'space-between'
        },
        buttonConfirmarStyle:{
            backgroundColor: "#E91429",
            borderRadius:10,
            width: 350
        },
        containerStyle:{
            borderRadius:10,
            width: 340
        },
        titleConfirmarStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        },
        buttonCancelarStyle:{
            backgroundColor: "#fff",
            borderRadius:10,
            width: 340,
            borderColor:"#ADADAD",
            borderWidth: 1
        },
        titleCancelarStyle:{
            color:"#ADADAD", 
            fontFamily:"PoppinsExtraBold"
        }
    }
});