import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button  } from 'react-native-elements';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Home({navigation}) {
    const isFocused = useIsFocused();
    const [open, setOpen] = useState(false);
    const [nomeUsuario, setnomeUsuario] = useState();
    const [CondominiosDono, setCondominiosDono] = useState([]);
    const [CondominiosMorador, setCondominiosMorador] = useState([]);

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
        
    });
    
    useEffect(() =>{
        CarregaUsuarioLogado()
        CarregaCondominios()
    },[isFocused])

    function CarregaUsuarioLogado(){

        axios.get(global.baseURL+":8080/union/user",{headers: {'token' : global.sessionID}})
        .then((response) =>{
            setnomeUsuario(response.data.name.split(" ")[0])
        }).catch((err) =>{
            console.log(err)
        })
    }

    function CarregaCondominios(){
        axios.get(global.baseURL+":8080/union/condominium?name=",{headers: {'token' : global.sessionID}})
        .then(async (response) =>{ 
            setCondominiosDono(response.data.filter((cond) => {return cond.userIsOwner == true}))
            setCondominiosMorador(response.data.filter((cond) => {return cond.userIsOwner == false}))

        }).catch((err) =>{
            console.log(err)
            
        })
    }


    function Logout(){
        axios.post(global.baseURL+":8080/union/user/logout",null,{headers:{'Content-Type': 'application/json', 'token': global.sessionID}})
        .then(() =>{
            navigation.navigate("Index")
        }).catch((err)=>{
            console.log(err)
        })

    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.areaLogado.row}>
                    <View style={styles.areaLogado.segundaRow}>
                        <Avatar
                            rounded
                            size="medium"
                            source={require('../../assets/images/user.jpg')}
                        />
                        <Text  style={styles.areaLogado.boasVindas}>Olá {nomeUsuario}</Text>
                    </View>
                    <Icon
                        onPress={()=>{Logout()}}
                        name='logout'
                        type='material'
                        color='#000'
                        size={24}
                    />
                </View>
                
                <View>
                    <Input
                        leftIcon={styles.caixaPesquisa.icone}
                        placeholder='Pesquisar condomínios...'
                        inputContainerStyle={styles.caixaPesquisa.inputContainerStyle}
                        inputStyle={styles.caixaPesquisa.inputStyle}
                        containerStyle={styles.caixaPesquisa.containerStyle}
                        style={styles.caixaPesquisa.alignment}
                    />
                </View>
                <View style={styles.caixaGerencio.nomargin}>
                    <Text  style={styles.caixaGerencio.titulo}>Condomínios que gerencio</Text>
                    <View style={styles.caixaGerencio.tamanhoScroll}>
                        <ScrollView contentContainerStyle={styles.caixaGerencio.scroll} horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false} centerContent={true}>
                        {

                            CondominiosDono.map((condominio) => (
                                    <Card key={condominio.unionIdentifier} containerStyle={styles.card.containerStyle}>
                                        <Card.Image  onPress={()=>{navigation.navigate("AdmCondominio", {idCondominio : condominio.unionIdentifier})}} source={require('../../assets/images/predio.jpg')} style={styles.card.image}>
                                            <View backgroundColor="#EFF3FF" style={styles.card.fundoCard}>
                                                <Text style={styles.card.titulo}>{condominio.name}</Text>
                                                <Text style={styles.card.subtitulo}>{condominio.tenantsCount} moradores</Text>
                                            </View>
                                        </Card.Image>
                                    </Card> 
                            ))
                        }
                        </ScrollView>
                    </View>

                    <View>
                        <Text style={styles.caixaGerencio.titulo}>Condomínios que faço parte</Text>
                        <View style={styles.caixaGerencio.tamanhoScroll}>
                            <ScrollView contentContainerStyle={styles.caixaGerencio.scroll} horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false} centerContent={true}>
                            {
                                CondominiosMorador.map((condominio) => (
                                        <Card key={condominio.unionIdentifier} containerStyle={styles.card.containerStyle}>
                                            <Card.Image  onPress={()=>{navigation.navigate("CondominioMorador", {idCondominio : condominio.unionIdentifier})}} source={require('../../assets/images/predio.jpg')} style={styles.card.image}>
                                                <View backgroundColor="#EFF3FF" style={styles.card.fundoCard}>
                                                    <Text style={styles.card.titulo}>{condominio.name}</Text>
                                                    <Text style={styles.card.subtitulo}>{condominio.tenantsCount} moradores</Text>
                                                </View>
                                            </Card.Image>
                                        </Card> 
                                ))

                            }
                            </ScrollView>
                        </View>
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
                    style={styles.SpeedDialStyle.style}
                    buttonStyle={styles.SpeedDialStyle.buttonAction}
                    icon={styles.SpeedDialStyle.iconHouseStyle}
                    iconContainerStyle= {styles.SpeedDialStyle.iconContainerStyle}
                    title="Condominíos Disponíveis" 
                    onPress={() => {navigation.navigate('ListaCondominios')}}
                />
                <SpeedDial.Action
                    style={styles.SpeedDialStyle.style}
                    buttonStyle={styles.SpeedDialStyle.buttonAction}
                    icon={styles.SpeedDialStyle.iconAddStyle}
                    iconContainerStyle= {styles.SpeedDialStyle.iconContainerStyle}
                    title="Novo condomínio" 
                    onPress={() => {navigation.navigate('NovoCondominio')}}
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
        justifyContent: 'space-evenly'
    },

    card:{
        containerStyle:{
            padding:0, 
            width:250, 
            height:150, 
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            marginEnd: 30, 
            margin:0, 
            borderRadius: 10
        },
        image:{
            flexDirection: 'column-reverse', 
            borderRadius: 10
        },
        fundoCard:{
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

    areaLogado:{
        row:{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: 350
        },
        segundaRow:{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: 240
        },
        boasVindas:{
            fontSize: 18, 
            marginStart: 25,
            fontFamily:"PoppinsExtraBold"    
        }
    },

    caixaPesquisa:{
        icone:{
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
        alignment:{
            alignSelf:"center"
        }
    },
    
    caixaGerencio:{
        nomargin:{
            margin: 0,
        },
        titulo:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            paddingHorizontal:20
        },
        tamanhoScroll:{
            height: 200
        },
        scroll:{
            paddingHorizontal:20
        }
    },
    SpeedDialStyle:{
        style:{
            width: 40
        },
        buttonAction:{
            width:55, 
            height: 55,
            backgroundColor:"#1DB954"
        },
        iconHouseStyle:{
            name: 'house', 
            color: '#fff', 
            size:35
        },
        iconAddStyle:{
            name: 'add', 
            color: '#fff', 
            size:35
        },
        iconContainerStyle:{
            backgroundColor:"#1DB954", 
            width:55, 
            height: 55
        }

    }
});