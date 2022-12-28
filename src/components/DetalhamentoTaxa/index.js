import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button, Overlay  } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function DetalhamentoTaxa({navigation, route}) {
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(false);
    const [IdMorador, setIdMorador] = useState();
    const [Debito, setDebito] = useState();
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
        CarregaDebito()
    },[isFocused])

    if (!loaded) {
        return null;
    }

    function CarregaDebito(){
        axios.get(global.baseURL+":8080/union/debt/" + route.params.idDebito,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setDebito(response.data)
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
    function CarregaMoradores(){
        axios.get(global.baseURL+":8080/union/debt/" + route.params.idDebito + "/user" ,{headers: {'token' : global.sessionID}})
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

    function ConfirmarPagamento(){
        axios.put(global.baseURL+":8080/union/debt/" + route.params.idDebito + "/user/" + IdMorador + "/payment" ,null,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            navigation.navigate("Feedback",{
                tipo : true,
                retornoEspecifico: false,
                mensagem : "Pagamento registrado com Sucesso!",
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
            <View style={styles.container}>
                <View>
                    <Text style={styles.infoTaxa.titulo}>{Debito != undefined ? Debito.title : "Erro"}</Text>
                    <View style={styles.infoTaxa.vencimentoConteiner}>
                        <Text style={styles.infoTaxa.vencimento}>Venc. {Debito != undefined ? Debito.expirationDate : "00/00/0000"}</Text>
                        <Text style={styles.infoTaxa.valor}>R${Debito != undefined ? Debito.value : "00"}</Text>

                    </View>
                </View>
                <View style={styles.lista.flex}>
                    <Text style={styles.lista.titulo}>Moradores</Text>
                    <View style={styles.lista.conteudo}>
                        <View style={styles.lista.post}>
                            <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>                           
                                {
                                    Moradores.map((morador) => (
                                        <Card key={morador.unionIdentifier} containerStyle={styles.card.containerStyle}>
                                            <View onTouchEnd={() => toggleOverlaySet(morador)} backgroundColor="#EFF3FF" style={styles.card.background}>
                                                <Text style={styles.card.titulo}>{morador.name}</Text>
                                            </View>
                                        </Card> 
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <Overlay isVisible={visible} onBackdropPress={()=> toggleOverlayUnSet()} overlayStyle={styles.overlay.flex}>
                <View>
                    <Text style={styles.overlay.descricaoTaxa}>{MoradorSelecionado}</Text>
                </View>


                <Button
                    buttonStyle= {styles.overlay.button.buttonStyle}
                    title="Confirmar Pagamento"
                    raised="true"
                    containerStyle={{
                        borderRadius:10
                    }}
                    onPress={()=>{ConfirmarPagamento()}}
                    titleStyle={styles.overlay.button.titleStyle}
                />
            </Overlay>

            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
    },
    infoTaxa:{
        titulo:{
            marginStart:20,
            fontSize: 30, 
            fontFamily:"PoppinsExtraBold"
        },
        vencimentoConteiner:{
            marginHorizontal: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        vencimento:{
            fontSize: 20, 
            fontFamily:"PoppinsSemiBold", 
            color:"#ADADAD"
        },
        valor:{
            fontSize: 24, 
            fontFamily:"PoppinsSemiBold", 
            color:"#1DB954"
        }
    },
    overlay:{
        flex:{
            width:'100%',
            height:180,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            position:'absolute',
            bottom:0,
            justifyContent: 'space-evenly',
            alignItems:'center',
            paddingStart: 25
        },
        descricaoTaxa:{
            fontSize: 30, 
            fontFamily:"PoppinsExtraBold"
        },
        vencimentoTaxa:{
            fontSize: 20, 
            fontFamily:"PoppinsSemiBold", 
            color:"#ADADAD"
        },
        input:{
            inputContainerStyle:{
                borderBottomWidth: 0
            },
            inputStyle:{
                fontFamily:"PoppinsSemiBold",
                height: 50
            },
            disabledInputStyle:{
                color:"#000000"
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
                width:350,
                height:50
            },
            titleStyle:{
                color:"#FFF", 
                fontFamily:"PoppinsExtraBold", 
                paddingStart:5
            }
        }
        
    },
    marginConteudo:{
        marginTop:40
    },
    titulo:{
        fontSize: 30, 
        fontFamily:"PoppinsExtraBold"
    },
    viewDebitos:{
        height:300, 
        padding:0, 
        margin: 0
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
        flex:{
            marginTop:30,

            justifyContent: "space-between"
        },
        conteudo:{
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
            height:350, 
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