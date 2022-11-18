import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button  } from 'react-native-elements';
import { useState } from 'react';

export default function CondominioMorador({navigation}) {

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
 
    let cards = []
    for(let i = 0; i< 5;i++){
        cards.push(
            <Card key={i} containerStyle={styles.card.cardContainerStyle}>
                <View backgroundColor="#EFF3FF" style={styles.card.backgroundStyle}>
                    <View style={styles.card.cardConteudo}>
                        <Avatar
                            rounded
                            size="medium"
                            source={require('../../assets/images/user.jpg')}
                        />
                        <Text  style={styles.card.tituloCard}>Usuario</Text>
                    </View>
                    <Text style={styles.card.textoCard}>Esse ipsum qui ipsum ea. Lorem labore minim occaecat sint cillum qui voluptate. Dolore aliqua adipisicing occaecat magna pariatur fugiat tempor irure pariatur tempor mollit excepteur eiusmod proident. Id do ea tempor commodo labore anim ea elit aliquip occaecat aliquip sit eu.dolor do anim deserunt ut eiusmod labore sint minim. Non mollit qui magna aliquip.</Text>
                </View>
            </Card> 
        )
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
                            <Text style={styles.detalhesCondominio.nomeCondominio}>Bloco 24</Text>
                            <Text style={styles.detalhesCondominio.enderecoCondominio}>Avenida um, 230</Text>
                        
                            <Button
                                buttonStyle= {styles.button.buttonStyle}
                                title="Joana Muniz"
                                containerStyle={styles.button.containerStyle}
                                titleStyle={styles.button.titleStyle}
                            />
                        </View>
                    </View>
                    <View style={styles.divInfoStyle.flexConteudo}>
                        <View style={styles.divInfoStyle.infoContainer}>
                            <Text style={styles.divInfoStyle.infoNumero}>25</Text>
                            <Text style={styles.divInfoStyle.infoTitulo}>Moradores</Text>
                        </View>
                        <View style={styles.divInfoStyle.infoContainer}>
                            <Text style={styles.divInfoStyle.infoNumero}>36</Text>
                            <Text style={styles.divInfoStyle.infoTitulo}>Publicações</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.feed.divConteudo}>
                    <Text style={styles.feed.titleConteudo}>Últimas atualizações</Text>
                    <View style={styles.feed.divScroll}>
                        <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                            {cards}
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
                    onPress={() => navigation.navigate('Debitos')}
                />
                <SpeedDial.Action
                    style={styles.speedDial.style}
                    buttonStyle={styles.speedDial.buttonStyle}
                    icon={styles.speedDial.iconExit}
                    iconContainerStyle= {styles.speedDial.iconExitContainer}
                    title="Sair do condomínio" 
                    onPress={() => navigation.navigate('Confirmacao')}
                />
            </SpeedDial>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    card:{
        cardContainerStyle:{
            padding:0, 
            width:345, 
            border: 0,
            borderWidth: 0, 
            marginTop:15, 
            marginEnd: 30, 
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
            marginTop:30
        },
        titleConteudo:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold"
        },
        divScroll:{
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