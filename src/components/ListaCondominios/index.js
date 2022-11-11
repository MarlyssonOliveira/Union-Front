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
            <Card key={i} containerStyle={{padding:0, width:345, height:150, border: 0,borderWidth: 0, marginTop:15, marginEnd: 30, margin:0, borderRadius: 10}}>
                <Card.Image onPress={toggleOverlay} source={require('../../assets/images/predio.jpg')} style={{flexDirection: 'column-reverse', borderRadius: 10}}>
                    <View backgroundColor="#EFF3FF" style={{borderBottomEndRadius:10,borderBottomStartRadius:10}}>
                        <Text style={{fontSize: 18, fontFamily:"PoppinsExtraBold", paddingStart: 5}}>Condomínio {i}</Text>
                        <Text style={{marginTop: 5, marginBottom:15, paddingStart: 5, color: "#ADADAD"}}>{(i+1)*10} moradores</Text>
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
                        leftIcon={{ type: 'ionicon', name: 'search' }}
                        placeholder='Pesquisar condomínios...'
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={{fontFamily:"PoppinsSemiBold",height: 50}}
                        containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                        style={{alignSelf:"center"}}
                    />
                </View>
                <View style={{margin: 0}}>
                    <Text  style={{fontSize: 20, fontFamily:"PoppinsExtraBold", paddingHorizontal:20}}>Condomínios disponíveis</Text>
                    <View style={{height:500}}>
                        <ScrollView contentContainerStyle={{paddingHorizontal:20}} showsVerticalScrollIndicator={false} >
                            {cards} 
                        </ScrollView>
                    </View>
                </View>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                    <View>
                        <Text style={{fontSize: 25, fontFamily:"PoppinsSemiBold"}}>Condomínio 01</Text>
                    </View>

                    <Button
                        buttonStyle= {{
                            backgroundColor: "#1DB954",
                            borderRadius:10,
                            width:350,
                            height:50
                        }}
                        title="Ingressar"
                        raised="true"
                        containerStyle={{
                            borderRadius:10
                        }}
                        titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold", paddingStart:5}}
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
        width:'100%',
        height:260,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        position:'absolute',
        bottom:0,
        justifyContent: 'space-evenly',
        alignItems:'flex-start',
        paddingStart: 15
    }
});