import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import * as Progress from 'react-native-progress'

export default function Confirmacao({navigation, route}) {
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

    });
    const [Condominio, setCondominio] = useState();
    const [spin, setSpin] = useState(false);

    useEffect(()=>{
        CarregaCondominio()
    },[])

    if (!loaded) {
        return null;
    }
    function DetelarCondominio(){
        setSpin(true)
        axios.delete(global.baseURL+"/union/condominium/" + route.params.idCondominio ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setSpin(false)
            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: true,
                mensagem : "Condominio deletado com sucesso!",
                textoBotao : "Pagina inicial!",
                destinoBotao : "Home"
            })
        }).catch((error) =>{
            setSpin(false)
            navigation.navigate("Feedback", {
                tipo : false,
                retornoEspecifico: true,
                mensagem : "Ocorreu um erro inesperado no sistema!",
                textoBotao : "Pagina Inicial",
                destinoBotao: "Home"
            })
        })
    }

    function CarregaCondominio(){
        setSpin(true)
        axios.get(global.baseURL+"/union/condominium/" + route.params.idCondominio ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setCondominio(response.data)
            setSpin(false)
        }).catch((error) =>{
            setSpin(false)
            navigation.navigate("Feedback", {
                tipo : false,
                retornoEspecifico: true,
                mensagem : "Ocorreu um erro inesperado no sistema!",
                textoBotao : "Pagina Inicial",
                destinoBotao: "Home"
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
            
                <Text style={styles.icon.titulo}>Tem certeza?</Text>
                <Text style={styles.icon.subtitulo}>Ao confirmar o condominio </Text>
                <Text style={styles.icon.nomeCondominio}>{Condominio != undefined ? Condominio.name : "Nome teste" }</Text>
                <Text style={styles.icon.subtitulo}> será deletado!</Text>
            </View>
            <View style={styles.buttons.flex}>
                <Button
                    buttonStyle= {styles.buttons.buttonConfirmarStyle}
                    style={{alignSelf:"center"}}
                    title={spin != false ?
                        <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} />: 'Confirmar'}
                    onPress={()=>DetelarCondominio()}
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
            borderColor:"#1DB954",
            borderWidth: 1
        },
        titleCancelarStyle:{
            color:"#1DB954", 
            fontFamily:"PoppinsExtraBold"
        }
    }
});