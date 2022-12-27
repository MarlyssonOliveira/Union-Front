import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Avatar, Button, Card, Icon, Image, Input, Overlay, SpeedDial } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";

export default function GerenciamentoTaxas({navigation, route}) {
    const isFocused = useIsFocused();

    const [Taxas, setTaxas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
      });

      useEffect(()=>{
        CarregaTaxas()
        },[isFocused])

      if (!loaded) {
        return null;
      }

    
    function CarregaTaxas(){
        axios.get(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/debt",{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setTaxas(response.data)
        }).catch((err) =>{
            console.log(err)
        })
    }
    return (
        <>
        <View style={styles.container}>
            <View>
                <Text style={styles.titulo}>Taxas Criadas</Text>
                <View style={styles.viewDebitos}>
                    <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                        {
                            Taxas.map((taxa) => (
                                    <Card key={taxa.unionIdentifier} containerStyle={styles.card.containerHistoricoStyle}>
                                        <View onTouchEnd={() => {navigation.navigate("DetalhamentoTaxa",{idDebito : taxa.unionIdentifier})}} style={styles.card.viewTituloCard}>
                                            <Text style={styles.card.tituloDebito}>{taxa.title}</Text>
                                            <View style={styles.card.flexDetalhesDebito}>
                                                <Text style={styles.card.textoVencimentoDebito}>Venc. {taxa.expirationDate}</Text>
                                                <Text style={styles.card.textoValorHistorico}>R$ {taxa.value}</Text>
                                            </View>
                                        </View>
                                    </Card> 
                                ))

                        }
                    </ScrollView>
                </View>
            </View>
        </View>

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
                icon={{ name: 'currency-usd', color: '#fff', size:35, type:"material-community"  }}
                iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                title="Cadastrar nova taxa"
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
        height:600, 
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
            borderStartColor: "#ADADAD", 
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
            color:"#ADADAD"
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
})