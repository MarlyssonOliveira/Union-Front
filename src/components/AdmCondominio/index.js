import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button, Overlay  } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function AdmCondominio({navigation, route}) {
    const isFocused = useIsFocused();

    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [Condominio, setCondominio] = useState();
    const [IdMensagem, setIdMensagem] = useState();
    const [ConteudoMensagem, setConteudoMensagem] = useState();
    const [Mensagens, setMensagens] = useState([]);
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
        
    });

    const toggleOverlaySet = (mensagem) => {
        setIdMensagem(mensagem.unionIdentifier)
        setConteudoMensagem(mensagem.message)
        setVisible(!visible);
    };

    const toggleOverlayUnSet = () => {
        setIdMensagem("")
        setConteudoMensagem("")
        setVisible(!visible);
    };
    
    useEffect(()=>{
        CarregaCondominio()
        CarregaMensagens()
    },[isFocused])

    if (!loaded) {
        return null;
    }

    function CarregaCondominio(){
        axios.get(global.baseURL+":8080/union/condominium/" + route.params.idCondominio ,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setCondominio(response.data)
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
            setMensagens(response.data)
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
    
    function DeletarMensagem(){
        axios.delete(global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/publication/" + IdMensagem,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            toggleOverlayUnSet()
            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: false,
                mensagem : "Mensagem Deletada com Sucesso!",
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
                <View style={styles.detalhesCondominio.flexConteudo}>
                    <View style={styles.detalhesCondominio.conteudo}>
                        <Image
                            source={require('../../assets/images/predio.jpg')}
                            style={styles.detalhesCondominio.imagem}
                            
                        />
                        <View style={{paddingStart:15}}>
                            <Text style={styles.detalhesCondominio.nome}>{Condominio != undefined ? Condominio.name : "Nome teste" }</Text>
                            <Text style={styles.detalhesCondominio.endereco}>{Condominio != undefined ? Condominio.address : "Nome teste" }</Text>
                            <Button
                                buttonStyle= {styles.detalhesCondominio.buttonStyle}
                                icon={
                                    <Icon
                                        name="pencil"
                                        type='material-community'
                                        size={25}
                                        color="#FFF"  
                                    />
                                }
                                onPress={() => navigation.navigate("AletrarImgCondominio")}
                                title="Alterar Imagem"
                                raised="true"
                                containerStyle={styles.detalhesCondominio.containerStyle}
                                titleStyle={styles.detalhesCondominio.titleStyle}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.feed.conteudo}>
                    <Text style={styles.feed.titulo}>Últimas atualizações</Text>
                    <View style={styles.feed.post}>
                        <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                            { 
                                Mensagens.length > 0 ?
                                    Mensagens.map((mensagem) => (
                                        <Card key={mensagem.unionIdentifier} containerStyle={styles.card.containerStyle}>
                                            <View onTouchEnd={() => toggleOverlaySet(mensagem)} backgroundColor="#EFF3FF" style={styles.card.background}>
                                                <View style={styles.card.topoCard}>
                                                    <Avatar
                                                        rounded
                                                        size="medium"
                                                        source={{uri:mensagem.user.urlPhotoProfile}}
                                                    />
                                                    <Text  style={styles.card.titulo}>{mensagem.user.name}</Text>
                                                </View>
                                                <Text style={styles.card.subtitulo}>{mensagem.message}</Text>
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

                <Overlay isVisible={visible} onBackdropPress={() => toggleOverlayUnSet()} overlayStyle={styles.overlay.style}>
                    <View>
                        <Text style={styles.overlay.titulo}>Deseja deletar a mensagem: "{ConteudoMensagem}"?</Text>
                    </View>

                    <Button
                        buttonStyle= {styles.overlay.button.buttonStyle}
                        title="Deletar"
                        raised="true"
                        onPress={() => DeletarMensagem()}
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
                    icon={{ name: 'message', color: '#fff', size:35 }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Nova mensagem" 
                    onPress={() => navigation.navigate('NovaMensagem', {
                        idCondominio : route.params.idCondominio
                    })}
                />
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'currency-usd', color: '#fff', size:35, type:"material-community"  }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Gerenciar taxas"
                    onPress={() => navigation.navigate('GerenciamentoTaxas', {
                        idCondominio : route.params.idCondominio
                    })}
                />
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'account-group-outline', color: '#fff', size:35, type:"material-community"  }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Gerenciar Moradores"
                    onPress={() => navigation.navigate('ListaMoradores', {
                        idCondominio : route.params.idCondominio
                    })}
                />
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'delete', color: '#fff', size:35 }}
                    iconContainerStyle= {styles.SpeedDial.iconRedContainetStyle}
                    title="Excluir condomínio" 
                    onPress={() => navigation.navigate('Confirmacao', {
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
        alignItems: 'center',
        justifyContent: 'center'
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
            margin:0, 
            borderRadius: 10,
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
            fontSize: 14, 
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

    detalhesCondominio:{
        flexConteudo:{
            alignSelf: 'flex-start', 
            paddingStart: 25
        },
        conteudo:{
            flexDirection:'row', 
            alignSelf: 'center', 
            justifyContent: 'space-between'
        },
        imagem:{
            width: 110, 
            height: 110, 
            borderRadius:10
        },
        nome:{
            fontSize: 24, 
            fontFamily:"PoppinsExtraBold"
        },
        endereco:{
            fontSize: 16, 
            fontFamily:"PoppinsMedium", 
            color:"#ADADAD"
        },
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            alignItems: 'center'
        },
        containerStyle:{
            borderRadius:10
        },
        titleStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold", 
            paddingStart:5}
    },

    feed:{
        conteudo:{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:30
        },
        titulo:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold"
        },
        post:{
            
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            height:450, 
            paddingVertical:10
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