import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button, Overlay  } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from "axios";
import * as Progress from 'react-native-progress'

export default function ListaCondominios({navigation}) {
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(false);
    const [ListaDisponiveis, setListaDisponiveis] = useState([]);
    const [IdCondominio, setIdCondominio] = useState();
    const [NomeCondominio, setNomeCondominio] = useState();
    const [OnUpdateImage, setOnUpdateImage] = useState();
    const [Pesquisa,setPesquisa] = useState('');
    const [spin, setSpin] = useState(false);

    const toggleOverlaySet = (condominio) => {
        setIdCondominio(condominio.unionIdentifier)
        setNomeCondominio(condominio.name)
        setVisible(!visible);
    };

    const toggleOverlayUnSet = () => {
        setIdCondominio("")
        setNomeCondominio("")
        setVisible(!visible);
    };

    function EntrarNoCondominio(){
        setSpin(true)
        axios.put(global.baseURL+"/union/condominium/" + IdCondominio + "/tenant",null,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            toggleOverlayUnSet()
            setSpin(false)

            navigation.navigate("Feedback", {
                tipo : true,
                retornoEspecifico: true,
                mensagem : "Entrou no condominio com sucesso!",
                textoBotao : "Página Inicial",
                destinoBotao : "Home"
            })
        }).catch((error) =>{
            toggleOverlayUnSet()
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

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
        
    });

    useEffect(() =>{
        CarregaCondominiosDisponiveis(Pesquisa)
    }, [isFocused, Pesquisa])
    
    if (!loaded) {
        return null;
    }

    function CarregaCondominiosDisponiveis(nome){
        axios.get(global.baseURL+"/union/condominium/availables?name="+nome,{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setListaDisponiveis(response.data)
        }).catch((error) =>{
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
                
                <View>
                    <Input
                        leftIcon={styles.input.leftIcon}
                        placeholder='Pesquisar condomínios...'
                        onChangeText={(nome) => {setPesquisa(nome)}}
                        inputContainerStyle={styles.input.inputContainerStyle}
                        inputStyle={styles.input.inputStyle}
                        containerStyle={styles.input.containerStyle}
                        style={styles.input.style}
                    />
                </View>
                <View style={styles.divLista.flex}>
                    <Text  style={styles.divLista.titulo}>Condomínios disponíveis</Text>
                    <View style={styles.divLista.divScroll}>
                        <ScrollView contentContainerStyle={styles.divLista.scroll} showsVerticalScrollIndicator={false} >
                            { 
                                ListaDisponiveis.length > 0 ?
                                    ListaDisponiveis.map((condominio) => (
                                        <Card key={condominio.unionIdentifier} containerStyle={styles.card.containerStyle}>
                                            <Card.Image onPress={() => toggleOverlaySet(condominio)} source={{ uri:condominio.urlPhotoProfile != undefined ? condominio.urlPhotoProfile + "?" + OnUpdateImage : global.genericBuildingUrl}} style={styles.card.cardImage}>
                                                <View backgroundColor="#EFF3FF" style={styles.card.divTitulos}>
                                                    <Text style={styles.card.titulo}>{condominio.name}</Text>
                                                    <Text style={styles.card.subtitulo}>{condominio.tenantsCount == null ? "0" : condominio.tenantsCount} moradores</Text>
                                                </View>
                                            </Card.Image>
                                        </Card> 
                                    ))
                                :
                                    <View style={styles.cardFeedback.container}>
                                        <Text style={styles.cardFeedback.mensagem}>Não existem condomínios disponíveis para você.</Text>
                                    </View>

                            }
                        </ScrollView>
                    </View>
                </View>

                <Overlay isVisible={visible} onBackdropPress={() => toggleOverlayUnSet()} overlayStyle={styles.overlay.style}>
                    <View>
                        <Text style={styles.overlay.titulo}>{NomeCondominio}</Text>
                    </View>

                    <Button
                        buttonStyle= {styles.overlay.button.buttonStyle}
                        title={spin != false ?
                            <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} />: 'Ingressar'}
                        raised="true"
                        onPress={() => EntrarNoCondominio()}
                        containerStyle={styles.overlay.button.containerStyle}
                        titleStyle={styles.overlay.button.titleStyle}
                    />
                </Overlay>
            </View>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
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
            alignItems:'flex-start',
            paddingStart: 15
        },
        titulo:{
            fontSize: 25, 
            fontFamily:"PoppinsSemiBold"
        },
        button:{
            buttonStyle:{
                backgroundColor: "#1DB954",
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
                paddingStart:5
            }
        }
        
    },
    card:{
        containerStyle:{
            padding:0, 
            width:345, 
            height:150, 
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            marginEnd: 30, 
            margin:0, 
            borderRadius: 10
        },
        cardImage:{
            flexDirection: 'column-reverse', 
            borderRadius: 10
        },
        divTitulos:{
            borderBottomEndRadius:10,
            borderBottomStartRadius:10
        },
        titulo:{
            fontSize: 18, 
            fontFamily:"PoppinsExtraBold", 
            paddingStart: 5
        },
        subtitulo:{
            marginTop: 5, 
            marginBottom:15, 
            paddingStart: 5, 
            color: "#ADADAD"
        }
    },
    input:{
        leftIcon:{
            type: 'ionicon', 
            name: 'search'
        },
        inputContainerStyle:{
            borderBottomWidth: 0
        },
        inputStyle:{
            fontFamily:"PoppinsSemiBold",
            height: 50
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
    divLista:{
        flex:{
            margin: 0
        },
        titulo:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            paddingHorizontal:20
        },
        divScroll:{
            height:500
        },
        scroll:{
            paddingHorizontal:20
        }
    },
    cardFeedback:{ 
        container:{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: 300,
            
        },
        mensagem:{
            fontSize: 18,
            fontFamily:"PoppinsExtraBold",
            textAlign: 'center',
            borderColor: "#ADADAD",
            borderWidth: 1,
            borderRadius: 20,
            padding: 5,
            backgroundColor: "#F0F1F5"
        }
    }
});