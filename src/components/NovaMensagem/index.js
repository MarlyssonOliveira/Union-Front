import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import axios from "axios";
import * as Progress from 'react-native-progress';
import { useState } from 'react';

export default function NovaMensagem({navigation,route}) {
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
      const [Mensagem, setMensagem] = useState();
      const [spin, setSpin] = useState();

    
      function CriarMensagem(){
        setSpin(true)
        axios.post(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/publication",{"message": Mensagem},{headers: {'token' : global.sessionID}})
        .then((response) => {
            setSpin(false)
            navigation.navigate("AdmCondominio", {
                idCondominio : route.params.idCondominio
            })
        }).catch((error) => {
            setSpin(false)
            if(error.response != undefined){
                console.log(error.response.data.message)
            }
            navigation.navigate("Feedback", {
                tipo : false,
                retornoEspecifico: true,
                mensagem : "Ocorreu um erro inesperado no sistema!",
                textoBotao : "Pagina Inicial",
                destinoBotao: "Home"
            })
        })
      }

      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <View style={styles.flexConteudo}>
                <Text style={styles.tituloPagina}>Nova mensagem</Text>
            </View>
            
            <View>
                <Text style={styles.labelCampos}>Mensagem</Text>
                <Input
                    placeholder='Sua mensagem...'
                    inputContainerStyle={styles.inputMensagem.inputContainerStyle}
                    inputStyle={styles.inputMensagem.inputStyle}
                    onChangeText = {(mensagem) => setMensagem(mensagem)}
                    containerStyle={styles.inputMensagem.containerStyle}
                    style={styles.inputMensagem.style}
                />
            </View>
            {/* <View>
                <Text style={styles.labelCampos}>Anexo</Text>
                <Input
                    placeholder='anexar um arquivo'
                    inputContainerStyle={styles.inputAnexo.inputContainerStyle}
                    inputStyle={styles.inputAnexo.inputStyle}
                    containerStyle={styles.inputAnexo.containerStyle}
                    style={styles.inputAnexo.style}
                    rightIcon={
                        <Icon
                            name="upload"
                            size={25}
                            type="font-awesome"
                            color="#1DB954"
                            
                        />
                    }
                />
            </View> */}
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.button.style}
                title={spin != false ?
                    <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} /> : 'Publicar'}
                raised="true"
                onPress={()=>CriarMensagem()}
                containerStyle={styles.button.containerStyle}
                titleStyle={styles.button.titleStyle}
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
    flexConteudo:{
        alignSelf:'flex-start', paddingStart:25
    },
    tituloPagina:{
        fontSize: 30, 
        fontFamily:"PoppinsExtraBold"
    },
    labelCampos:{
        fontSize: 20, 
        fontFamily:"PoppinsExtraBold", 
        color:"#000000"
    },
    inputMensagem:{
        inputContainerStyle:{
            borderBottomWidth: 0
        },
        inputStyle:{
            fontFamily:"PoppinsRegular"
        },
        containerStyle:{
            width: 350, 
            backgroundColor:"#F0F1F5", 
            borderRadius: 10, 
            height: 150
        },
        style:{
            alignSelf:"center"
        }
    },
    inputAnexo:{
        inputContainerStyle:{
            borderBottomWidth: 0, 
            alignItems: 'center'
        },
        inputStyle:{
            fontFamily:"PoppinsRegular",
            height: 55
        },
        containerStyle:{
            width: 350, 
            backgroundColor:"#F0F1F5", 
            borderRadius: 10, 
            height: 50
        },
        style:{
            alignSelf:"center"
        }
    },
    button:{
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            width: 350
        },
        style:{
            alignSelf:"center"
        },
        containerStyle:{
            borderRadius:10
        },
        titleStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        }
    }
});