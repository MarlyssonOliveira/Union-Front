import { ScrollView, StyleSheet, Linking, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button  } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function CondominioMorador({navigation,route}) {
    const isFocused = useIsFocused();
    const [open, setOpen] = useState(false);
    const [Condominio, setCondominioMorador] = useState();
    const [Mensagens, setMensagensCondominio] = useState([]);
    const [PossuiNumero, setPossuiNumero] = useState(false);
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
        
    });

    useEffect(()=>{
        CarregaCondominio()
        CarregaMensagens()
    }, [isFocused])

    if (!loaded) {
        return null;
    }

    function CarregaCondominio(){
        axios.get(global.baseURL+":8080/union/condominium/" + route.params.idCondominio ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setCondominioMorador(response.data)
            if(response.data.owner.phone != null && response.data.owner.phone != undefined && response.data.owner.phone != ""){
                setPossuiNumero(true)
            }
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

    function CarregaMensagens(){
        axios.get(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/publication" ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setMensagensCondominio(response.data)
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

    function EntraNoWathsApp(url){
        try {
            if(url != null){
                Linking.openURL(url)
            }else{

            }
        } catch (error) {
            console.log(error)
        }
    }

    function SairDoCondominio(){
        axios.delete(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/tenant/leave" ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: true,
                mensagem : "Você saiu do condomínio com Sucesso!",
                textoBotao : "Página Inicial",
                destinoBotao : "Home"
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
                <View style={styles.detalhesCondominio.flexConteudo}>
                    <View style={styles.detalhesCondominio.conteudo}>
                        <Image
                            source={require('../../assets/images/predio.jpg')}
                            style={styles.detalhesCondominio.imageStyle}
                        />
                        <View>
                        <Text style={styles.detalhesCondominio.nome}>{Condominio != undefined ? Condominio.name : "Nome teste" }</Text>
                            <Text style={styles.detalhesCondominio.enderecoCondominio}>{Condominio != undefined ? Condominio.address : "Nome teste" }</Text>
                            <Text style={styles.detalhesCondominio.whatsResponsavel}>Responsavel:</Text>
                            <Button
                                buttonStyle= {styles.button.buttonStyle}
                                title={Condominio != undefined ? Condominio.owner.name.split(" ")[0] : "Sindico"}
                                onPress={() => EntraNoWathsApp("https://wa.me/55" + Condominio.owner.phone)}
                                containerStyle={styles.button.containerStyle}
                                titleStyle={styles.button.titleStyle}
                                disabled={!PossuiNumero}
                            />
                        </View>
                    </View>
                    <View style={styles.divInfoStyle.flexConteudo}>
                        <View style={styles.divInfoStyle.infoContainer}>
                            <Text style={styles.divInfoStyle.infoNumero}>{Condominio != undefined ? Condominio.tenantsCount : 0}</Text>
                            <Text style={styles.divInfoStyle.infoTitulo}>Moradores</Text>
                        </View>
                        <View style={styles.divInfoStyle.infoContainer}>
                            <Text style={styles.divInfoStyle.infoNumero}>{Condominio != undefined ? Condominio.publicationsCount : 0}</Text>
                            <Text style={styles.divInfoStyle.infoTitulo}>Publicações</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.feed.divConteudo}>
                    <Text style={styles.feed.titleConteudo}>Últimas atualizações</Text>
                    <View style={styles.feed.divScroll}>
                        <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                            {
                                Mensagens.length > 0 ?
                                    Mensagens.map((mensagem) => (
                                        <Card key={mensagem.unionIdentifier} containerStyle={styles.card.cardContainerStyle}>
                                            <View backgroundColor="#EFF3FF" style={styles.card.backgroundStyle}>
                                                <View style={styles.card.cardConteudo}>
                                                    <Avatar
                                                        rounded
                                                        size="medium"
                                                        source={require('../../assets/images/user.jpg')}
                                                    />
                                                    <Text  style={styles.card.tituloCard}>{mensagem.user.name}</Text>
                                                </View>
                                                <Text style={styles.card.textoCard}>{mensagem.message}</Text>
                                            </View>
                                        </Card> 
                                    ))
                                :
                                    <View>
                                        <Text>Sem mensagens no condominio.</Text>
                                    </View>
                            }
                        </ScrollView>
                    </View>
                </View>

                
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
                    style={styles.speedDial.style}
                    buttonStyle={styles.speedDial.buttonStyle}
                    icon={styles.speedDial.iconDebitos}
                    iconContainerStyle= {styles.speedDial.iconDebitosContainer}
                    title="Débitos"
                    onPress={() => navigation.navigate('Debitos',{idCondominio : route.params.idCondominio})}
                />
                <SpeedDial.Action
                    style={styles.speedDial.style}
                    buttonStyle={styles.speedDial.buttonStyle}
                    icon={styles.speedDial.iconExit}
                    iconContainerStyle= {styles.speedDial.iconExitContainer}
                    title="Sair do condomínio" 
                    onPress={() => SairDoCondominio()}
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
        justifyContent: 'center'
    },

    card:{
        cardContainerStyle:{
            padding:0, 
            width:345, 
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            margin:0, 
            borderRadius: 10
        },
        backgroundStyle:{
            borderRadius:10, 
            padding:15
        },
        cardConteudo:{
            flexDirection: 'row', 
            justifyContent: 'flex-start', 
            alignItems: 'center'
        },
        tituloCard:{
            fontSize: 14, 
            fontFamily:"PoppinsExtraBold", 
            paddingHorizontal:15
        },
        textoCard:{
            fontSize: 12,
            color: "#000", 
            fontFamily:"PoppinsRegular", 
            paddingTop:10
        }
    },
    detalhesCondominio:{
        flexConteudo:{
            alignSelf:'flex-start', 
            paddingStart:25
        },
        conteudo:{
            flexDirection:'row', 
            justifyContent: 'space-between', 
            width: 275
        },

        imageStyle:{
            width: 110, 
            height: 110, 
            borderRadius:10
        },
        nomeCondominio:{
            fontSize: 24, 
            fontFamily:"PoppinsExtraBold"
        },
        enderecoCondominio:{
            fontSize: 16, 
            fontFamily:"PoppinsMedium", 
            color:"#ADADAD"
        },
        whatsResponsavel:{
            fontSize: 16, 
            fontFamily:"PoppinsExtraBold", 
            color:"#ADADAD"
        }
    },
    button:{
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            height:35,
            width:140,
            alignItems: 'center',
            padding:0,
            margin:0
        },
        containerStyle:{
            borderRadius:10,
            height:35,
            width:140,
            alignItems: 'center',
            padding:0,
            margin:0
        },
        titleStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsRegular",
            fontSize:18
        }
    },
    divInfoStyle:{
        flexConteudo:{
            width:345, 
            height:73, 
            backgroundColor:"#EFF3FF",
            borderRadius:10, 
            marginTop:18, 
            flexDirection: 'row', 
            justifyContent: 'space-evenly', 
            alignItems:'center'
        },
        infoContainer:{
            alignItems:'center', 
            justifyContent: 'center', 
            height:30
        },
        infoNumero:{
            fontSize: 25, 
            fontFamily:"PoppinsExtraBold"
        },
        infoTitulo:{
            fontSize: 18, 
            fontFamily:"PoppinsRegular"
        }
    },
    feed:{
        divConteudo:{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:30
        },
        titleConteudo:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold"
        },
        divScroll:{
            justifyContent: 'center',
            alignItems: 'center',
            width:'100%',
            height:300, 
            paddingVertical:10,
        }
    },
    speedDial:{
        style:{
            width:40
        },
        buttonStyle:{
            width:55, 
            height: 55,
            backgroundColor:"#1DB954"
        },
        iconDebitos:{
            name: 'currency-usd', 
            color: '#fff', 
            size:35, 
            type:"material-community"
        },
        iconExit:{
            name: 'delete', 
            color: '#fff', 
            size:35
        },
        iconDebitosContainer:{
            backgroundColor:"#1DB954",
            width:55, 
            height: 55
        },
        iconExitContainer:{
            backgroundColor:"#E91429", 
            width:55, 
            height: 55
        }
    }
});