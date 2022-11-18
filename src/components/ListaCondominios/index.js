import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button, Overlay  } from 'react-native-elements';
import { useState } from 'react';

export default function ListaCondominios() {

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
    let cards = []
    for(let i = 0; i< 5;i++){
        cards.push(
            <Card key={i} containerStyle={styles.card.containerStyle}>
                <Card.Image onPress={toggleOverlay} source={require('../../assets/images/predio.jpg')} style={styles.card.cardImage}>
                    <View backgroundColor="#EFF3FF" style={styles.card.divTitulos}>
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
                
                <View>
                    <Input
                        leftIcon={styles.input.leftIcon}
                        placeholder='Pesquisar condomínios...'
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
                            {cards} 
                        </ScrollView>
                    </View>
                </View>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay.style}>
                    <View>
                        <Text style={styles.overlay.titulo}>Condomínio 01</Text>
                    </View>

                    <Button
                        buttonStyle= {styles.overlay.button.buttonStyle}
                        title="Ingressar"
                        raised="true"
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
    }
});