import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button  } from 'react-native-elements';
import { useState } from 'react';
import axios from "axios";

export default function Home({navigation}) {
    const [open, setOpen] = useState(false);
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf")
        
    });
    
    if (!loaded) {
        return null;
    }

    function Logout(){
        axios.post("http://192.168.0.107:8080/union/user/logout",null,{headers:{'Content-Type': 'application/json', 'token': global.sessionID}})
        .then(() =>{
            navigation.navigate("Index")
        }).catch((err)=>{
            console.log(err)
        })

    }
    let cardsGerencio = []
    let cardsFacoParte = []
    for(let i = 0; i< 5;i++){
        cardsGerencio.push(
            <Card key={i} containerStyle={styles.card.containerStyle}>
                <Card.Image  onPress={()=>{navigation.navigate("AdmCondominio")}} source={require('../../assets/images/predio.jpg')} style={styles.card.image}>
                    <View backgroundColor="#EFF3FF" style={styles.card.fundoCard}>
                        <Text style={styles.card.titulo}>Condomínio {i}</Text>
                        <Text style={styles.card.subtitulo}>{(i+1)*10} moradores</Text>
                    </View>
                </Card.Image>
            </Card> 
        )

        cardsFacoParte.push(
            <Card key={i} containerStyle={styles.card.containerStyle}>
                <Card.Image onPress={()=>{navigation.navigate("CondominioMorador")}} source={require('../../assets/images/predio.jpg')} style={styles.card.image}>
                    <View backgroundColor="#EFF3FF" style={styles.card.fundoCard}>
                        <Text style={styles.card.titulo}>Condomínio {i}</Text>
                        <Text style={styles.card.subtitulo}>{(i+1)*10} moradores</Text>
                    </View>
                </Card.Image>
            </Card> 
        )
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
                        <Text  style={styles.areaLogado.boasVindas}>Ola Usuario logado</Text>
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
                            {cardsGerencio} 
                        </ScrollView>
                    </View>

                    <View>
                        <Text style={styles.caixaGerencio.titulo}>Condomínios que faço parte</Text>
                        <View style={styles.caixaGerencio.tamanhoScroll}>
                            <ScrollView contentContainerStyle={styles.caixaGerencio.scroll} horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false} centerContent={true}>
                                {cardsFacoParte}
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
                    title="Condominíos registrados" 
                    onPress={() => navigation.navigate('ListaCondominios')}
                />
                <SpeedDial.Action
                    style={styles.SpeedDialStyle.style}
                    buttonStyle={styles.SpeedDialStyle.buttonAction}
                    icon={styles.SpeedDialStyle.iconAddStyle}
                    iconContainerStyle= {styles.SpeedDialStyle.iconContainerStyle}
                    title="Novo condomínio" 
                    onPress={() => navigation.navigate('NovoCondominio')}
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