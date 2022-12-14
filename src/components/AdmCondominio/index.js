import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button  } from 'react-native-elements';
import { useState } from 'react';

export default function AdmCondominio({navigation, route}) {

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
            <Card key={i} containerStyle={styles.card.containerStyle}>
                <View backgroundColor="#EFF3FF" style={styles.card.background}>
                    <View style={styles.card.topoCard}>
                        <Avatar
                            rounded
                            size="medium"
                            source={require('../../assets/images/user.jpg')}
                        />
                        <Text  style={styles.card.titulo}>Usuario</Text>
                    </View>
                    <Text style={styles.card.subtitulo}>Esse ipsum qui ipsum ea. Lorem labore minim occaecat sint cillum qui voluptate. Dolore aliqua adipisicing occaecat magna pariatur fugiat tempor irure pariatur tempor mollit excepteur eiusmod proident. Id do ea tempor commodo labore anim ea elit aliquip occaecat aliquip sit eu.dolor do anim deserunt ut eiusmod labore sint minim. Non mollit qui magna aliquip.</Text>
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
                            style={styles.detalhesCondominio.imagem}
                            
                        />
                        <View style={{paddingStart:15}}>
                            <Text style={styles.detalhesCondominio.nome}>Bloco 24</Text>
                            <Text style={styles.detalhesCondominio.endereco}>Avenida um, 230</Text>
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
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'file-table', color: '#fff', size:35, type:"material-community" }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Adicionar moradores" 
                    onPress={() => navigation.navigate('CSVCondominio', {
                        idCondominio : route.params.idCondominio
                    })}
                />
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'message', color: '#fff', size:35 }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Nova mensagem" 
                    onPress={() => navigation.navigate('NovaMensagem')}
                />
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'currency-usd', color: '#fff', size:35, type:"material-community"  }}
                    iconContainerStyle= {styles.SpeedDial.iconGreenContainerStyle}
                    title="Nova taxa"
                    onPress={() => navigation.navigate('NovaTaxa')}
                />
                <SpeedDial.Action
                    style={styles.SpeedDial.width}
                    buttonStyle={styles.SpeedDial.buttonStyle}
                    icon={{ name: 'delete', color: '#fff', size:35 }}
                    iconContainerStyle= {styles.SpeedDial.iconRedContainetStyle}
                    title="Excluir condomínio" 
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
        width: "100%",
        alignItems: 'flex-end',
        justifyContent: 'center'
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
            marginTop:30
        },
        titulo:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold"
        },
        post:{
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