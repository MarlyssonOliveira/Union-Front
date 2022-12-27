import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { useFonts } from "expo-font";
import { Avatar, Button, Card, Icon, Image, Input, Overlay } from 'react-native-elements';
import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import axios from "axios";

export default function Debitos({navigation,route}) {
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(false);
    const [DebitosAbertos, setDebitosAbertos] = useState([]);
    const [DebitoSelecionado, setDebitoSelecionado] = useState();
    const [Historico, setHistorico] = useState([]);
    const [ChavePix, setChavePix] = useState('');

    const toggleOverlaySet = (debito) => {
        setDebitoSelecionado(debito)
        setChavePix(debito.pixKey)
        setVisible(!visible);
    };

    const toggleOverlayUnSet = () => {
        setDebitoSelecionado({})
        setVisible(!visible);
    };

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
      });
    
      useEffect(() => {
        CarregaDebitosAbertos();
        CarregaHistorico();
      },[isFocused])

      if (!loaded) {
        return null;
      }

    function CarregaHistorico(){
        axios.get(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/debt/history" ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setHistorico(response.data)
        }).catch((err) =>{
            console.log(err)
        })
    }

    function Copiar(){
         Clipboard.setStringAsync(ChavePix);
      };

    function CarregaDebitosAbertos(){
        axios.get(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/debt/open" ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setDebitosAbertos(response.data)
        }).catch((err) =>{
            console.log(err)
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.marginConteudo}>
                <Text style={styles.titulo}>Débitos</Text>
                <View style={styles.viewDebitos}>
                    <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                        {
                            DebitosAbertos.map((debitoAberto) => (
                                <Card key={debitoAberto.unionIdentifier} containerStyle={ debitoAberto.overdue ? styles.card.containerDangerStyle : styles.card.containerAlertStyle }>
                                    <View onTouchEnd={() => toggleOverlaySet(debitoAberto)} style={styles.card.viewTituloCard}>
                                            <Text style={styles.card.tituloDebito}>{debitoAberto.title}</Text>
                                            <View style={styles.card.flexDetalhesDebito}>
                                                <Text style={styles.card.textoVencimentoDebito}>Venc. {debitoAberto.expirationDate}</Text>
                                                <Text style={debitoAberto.overdue ? styles.card.textoValorVencido : styles.card.textoValorAVencer}>R$ {debitoAberto.value}</Text>
                                            </View>
                                    </View>
                                </Card>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text style={styles.titulo}>Histórico</Text>
                <View style={styles.viewDebitos}>
                    <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                        {
                            Historico.map((debitoPago) => (
                                <Card key={debitoPago.unionIdentifier} containerStyle={styles.card.containerHistoricoStyle}>
                                    <View style={styles.card.viewTituloCard}>
                                        <Text style={styles.card.tituloDebito}>{debitoPago.title}</Text>
                                        <View style={styles.card.flexDetalhesDebito}>
                                            <Text style={styles.card.textoVencimentoDebito}>Venc. {debitoPago.expirationDate}</Text>
                                            <Text style={styles.card.textoValorHistorico}>R$ {debitoPago.value}</Text>
                                        </View>
                                    </View>
                                </Card>
                            ))
                        }
                         
                        
                    </ScrollView>
                </View>
            </View>


            <Overlay isVisible={visible} onBackdropPress={() => toggleOverlayUnSet()} overlayStyle={styles.overlay.flex}>
                <View>
                    <Text style={styles.overlay.descricaoTaxa}>{DebitoSelecionado != undefined ? DebitoSelecionado.title : "Undefined"}</Text>
                    <Text style={styles.overlay.vencimentoTaxa}>{DebitoSelecionado != undefined ? DebitoSelecionado.expirationDate : "00/00/0000"}</Text>
                </View>
                <Input
                    value={DebitoSelecionado != undefined ? DebitoSelecionado.pixKey : "aaa-bbb-ccc"}
                    inputContainerStyle={styles.overlay.input.inputContainerStyle}
                    inputStyle={styles.overlay.input.inputStyle}
                    disabled={true}
                    disabledInputStyle={styles.overlay.input.disabledInputStyle}
                    containerStyle={styles.overlay.input.containerStyle}
                    style={styles.overlay.input.style}
                />

                <Button
                    buttonStyle= {styles.overlay.button.buttonStyle}
                    icon={
                        <Icon
                          name="content-copy"
                          size={25}
                          color="#FFF"
                          
                        />
                      }
                    title="Copiar chave"
                    raised="true"
                    onPress={() => Copiar()}
                    containerStyle={{
                        borderRadius:10
                    }}
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
        alignItems: 'center',
        paddingStart:20,
        justifyContent: 'space-evenly',
    },
    overlay:{
        flex:{
            width:'100%',
            height:360,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            position:'absolute',
            bottom:0,
            justifyContent: 'space-evenly',
            alignItems:'center',
            paddingStart: 15
        },
        descricaoTaxa:{
            fontSize: 25, 
            fontFamily:"PoppinsSemiBold"
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
        containerAlertStyle:{
            padding:0, 
            width:345, 
            height:110, 
            borderStartColor: "#ffdf29", 
            borderStartWidth: 20 ,
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            marginEnd: 30, 
            margin:0, 
            borderRadius: 10
        },
        containerDangerStyle:{
            padding:0, 
            width:345, 
            height:110, 
            borderStartColor: "#E91429", 
            borderStartWidth: 20 ,
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            marginEnd: 30, 
            margin:0, 
            borderRadius: 10
        },
        containerHistoricoStyle:{
            padding:0, 
            width:345, 
            height:110, 
            borderStartColor: "#1DB954", 
            borderStartWidth: 20 ,
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            marginEnd: 30, 
            margin:0, 
            borderRadius: 10
        },
        viewTituloCard:{
            borderRadius:10, 
            padding:15, 
            justifyContent: 'space-between', 
            height: 110
        },
        tituloDebito:{
            fontSize: 20, 
            fontFamily:"PoppinsSemiBold"
        },
        flexDetalhesDebito:{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center'
        },
        textoVencimentoDebito:{
            fontSize: 20, 
            fontFamily:"PoppinsRegular", 
            color:"#ADADAD"
        },
        textoValorAVencer:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            color:"#ffdf29"
        },
        textoValorVencido:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            color:"#E91429"
        },
        textoValorHistorico:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            color:"#1DB954"
        }
    }
})