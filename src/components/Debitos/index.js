import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Avatar, Button, Card, Icon, Image, Input, Overlay } from 'react-native-elements';
import { useState } from 'react';

export default function Debitos() {

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
      });
    
      if (!loaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <View style={styles.marginConteudo}>
                <Text style={styles.titulo}>Débitos</Text>
                <View style={styles.viewDebitos}>
                    <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                        <Card containerStyle={styles.card.containerAlertStyle}>
                            <View onTouchEnd={toggleOverlay} style={styles.card.viewTituloCard}>
                                    <Text style={styles.card.tituloDebito}>Taxa - Novembro</Text>
                                    <View style={styles.card.flexDetalhesDebito}>
                                        <Text style={styles.card.textoVencimentoDebito}>Venc. 05/11/2022</Text>
                                        <Text style={styles.card.textoValorAVencer}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 

                        <Card containerStyle={styles.card.containerDangerStyle}>
                            <View onTouchEnd={toggleOverlay} style={styles.card.viewTituloCard}>
                                    <Text style={styles.card.tituloDebito}>Taxa - Outubro</Text>
                                    <View style={styles.card.flexDetalhesDebito}>
                                        <Text style={styles.card.textoVencimentoDebito}>Venc. 05/10/2022</Text>
                                        <Text style={styles.card.textoValorVencido}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text style={styles.titulo}>Histórico</Text>
                <View style={styles.viewDebitos}>
                    <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>

                        <Card containerStyle={styles.card.containerHistoricoStyle}>
                            <View onTouchEnd={toggleOverlay} style={styles.card.viewTituloCard}>
                                    <Text style={styles.card.tituloDebito}>Taxa - Novembro</Text>
                                    <View style={styles.card.flexDetalhesDebito}>
                                        <Text style={styles.card.textoVencimentoDebito}>Venc. 05/12/2022</Text>
                                        <Text style={styles.card.textoValorHistorico}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                        <Card containerStyle={styles.card.containerHistoricoStyle}>
                            <View onTouchEnd={toggleOverlay} style={styles.card.viewTituloCard}>
                                    <Text style={styles.card.tituloDebito}>Taxa - Novembro</Text>
                                    <View style={styles.card.flexDetalhesDebito}>
                                        <Text style={styles.card.textoVencimentoDebito}>Venc. 05/12/2022</Text>
                                        <Text style={styles.card.textoValorHistorico}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                        <Card containerStyle={styles.card.containerHistoricoStyle}>
                            <View onTouchEnd={toggleOverlay} style={styles.card.viewTituloCard}>
                                    <Text style={styles.card.tituloDebito}>Taxa - Novembro</Text>
                                    <View style={styles.card.flexDetalhesDebito}>
                                        <Text style={styles.card.textoVencimentoDebito}>Venc. 05/12/2022</Text>
                                        <Text style={styles.card.textoValorHistorico}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                    </ScrollView>
                </View>
            </View>


            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay.flex}>
                <View>
                    <Text style={styles.overlay.descricaoTaxa}>Taxa - Novembro</Text>
                    <Text style={styles.overlay.vencimentoTaxa}>05/12/2022</Text>
                </View>
                <Input
                    value='e6eae6fd-c638-458e-bbbb-c638c638-c638'
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