import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button, Overlay  } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function ListaMoradores({navigation, route}) {
    const isFocused = useIsFocused();

    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [Condominio, setCondominio] = useState();
    const [IdMorador, setIdMorador] = useState();
    const [MoradorSelecionado, setMoradorSelecionado] = useState();
    const [Moradores, setMoradores] = useState([]);
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
        
    });

    const toggleOverlaySet = (morador) => {
        setIdMorador(morador.unionIdentifier)
        setMoradorSelecionado(morador.name)
        setVisible(!visible);
    };

    const toggleOverlayUnSet = () => {
        setIdMorador("")
        setMoradorSelecionado("")
        setVisible(!visible);
    };
    
    useEffect(()=>{
        CarregaMoradores()
    },[isFocused])

    if (!loaded) {
        return null;
    }

    function CarregaMoradores(){
        axios.get(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/tenant" ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setMoradores(response.data)
        }).catch((error) =>{
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
    
    function RemoverMorador(){
        axios.delete(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/tenant/" + IdMorador,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            toggleOverlayUnSet()
            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: false,
                mensagem : "Morador removido com Sucesso!",
                textoBotao : "Voltar",
            })
        }).catch((error) =>{
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

    return (
        <>
            <View style={styles.container}>

                <Text style={styles.lista.titulo}>Moradores</Text>
                <View style={styles.lista.conteudo}>
                    <View style={styles.lista.post}>
                        <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>                           
                            { 
                                Moradores.length > 0 ?
                                    Moradores.map((morador) => (
                                        <Card key={morador.unionIdentifier} containerStyle={styles.card.containerStyle}>
                                            <View onTouchEnd={() => toggleOverlaySet(morador)} backgroundColor="#EFF3FF" style={styles.card.background}>
                                                <Text style={styles.card.titulo}>{morador.name}</Text>
                                            </View>
                                        </Card> 
                                    ))
                                :
                                    <View>
                                        <Text>O condominio nao possui moradores.</Text>
                                    </View>
                            }
                        </ScrollView>
                    </View>
                </View>

                <Overlay isVisible={visible} onBackdropPress={() => toggleOverlayUnSet()} overlayStyle={styles.overlay.style}>
                    <View>
                        <Text style={styles.overlay.titulo}>Deseja remover o morador: {MoradorSelecionado}?</Text>
                    </View>

                    <Button
                        buttonStyle= {styles.overlay.button.buttonStyle}
                        title="Remover"
                        raised="true"
                        onPress={() => RemoverMorador()}
                        containerStyle={styles.overlay.button.containerStyle}
                        titleStyle={styles.overlay.button.titleStyle}
                    />
                </Overlay>

            </View>

        {/* Speed Dial */}

            <SpeedDial
            isOpen={open}
            icon= {{ name: 'add', color: '#fff'}}
            iconContainerStyle= {(open == true) ? {backgroundColor:"#FFFFFF"} : {backgroundColor:"#1DB954"}}
            openIcon={{ name: 'close', color: '#1DB954' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            >
                
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'file-table', color: '#fff', size:35, type:"material-community" }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Adicionar moradores" 
                    onPress={() => navigation.navigate('CSVCondominio', {
                        idCondominio : route.params.idCondominio
                    })}
                />
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'currency-usd', color: '#fff', size:35, type:"material-community"  }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Gerenciar taxas"
                    onPress={() => navigation.navigate('NovaTaxa', {
                        idCondominio : route.params.idCondominio
                    })}
                />
            </SpeedDial>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
    },
    overlay:{
        style:{
            width:'100%',
            height:260,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            position:'absolute',
            bottom:0,
            justifyContent: 'space-evenly',
            alignItems:'center',
            paddingStart: 15
        },
        titulo:{
            fontSize: 25, 
            fontFamily:"PoppinsSemiBold",
            textAlign: 'center'
        },
        button:{
            buttonStyle:{
                backgroundColor: "#E91429",
                borderRadius:10,
                width:350,
                height:50
            },
            containerStyle:{
                borderRadius:10
            },
            titleStyle:{
                color:"#FFF", 
                fontFamily:"PoppinsExtraBold", 
                fontSize: 20,
                paddingStart:5
            }
        }
        
    },
    card:{
        containerStyle:{
            padding:0, 
            width:345, 
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            marginEnd: 30, 
            margin:0, 
            borderRadius: 10
        },
        background:{
            borderRadius:10, 
            padding:15
        },
        topoCard:{
            flexDirection: 'row', 
            justifyContent: 'flex-start', 
            alignItems: 'center'
        },
        titulo:{
            fontSize: 16, 
            fontFamily:"PoppinsExtraBold", 
            paddingHorizontal:15
        },
        subtitulo:{
            fontSize: 12,
            color: "#000", 
            fontFamily:"PoppinsRegular", 
            paddingTop:10
        }
    },

    lista:{
        conteudo:{
            marginTop:30,
            marginStart: 20,
            alignItems: "center",
            justifyContent: "center"
        },
        titulo:{
            fontSize: 30, 
            fontFamily:"PoppinsExtraBold",
            textAlign: "center"
        },
        post:{
            height:550, 
            paddingVertical:10,
            alignItems: "center",
            justifyContent: "center"

        }
    },

    SpeedDial:{
        width:{
            width:40
        },
        buttonStyle:{
            width:55, 
            height: 55,
            backgroundColor:"#1DB954"
        },
        iconGreenContainerStyle:{
            backgroundColor:"#1DB954", 
            width:55, 
            height: 55
        },
        iconRedContainetStyle:{
            backgroundColor:"#E91429", 
            width:55, 
            height: 55
        }
    }
});