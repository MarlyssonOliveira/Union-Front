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
            <View style={{marginTop:40}}>
                <Text style={{fontSize: 30, fontFamily:"PoppinsExtraBold"}}>Débitos</Text>
                <View style={{height:300, padding:0, margin: 0}}>
                    <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>
                        <Card containerStyle={{padding:0, width:345, height:110, borderStartColor: "#ffdf29", borderStartWidth: 20 ,border: 0,borderWidth: 0, marginTop:15, marginEnd: 30, margin:0, borderRadius: 10}}>
                            <View onTouchEnd={toggleOverlay} style={{borderRadius:10, padding:15, justifyContent: 'space-between', height: 110}}>
                                    <Text style={{fontSize: 20, fontFamily:"PoppinsSemiBold"}}>Taxa - Novembro</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsRegular", color:"#ADADAD"}}>Venc. 05/12/2022</Text>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#ffdf29"}}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 

                        <Card containerStyle={{padding:0, width:345, height:110, borderStartColor: "#E91429", borderStartWidth: 20 ,border: 0,borderWidth: 0, marginTop:15, marginEnd: 30, margin:0, borderRadius: 10}}>
                            <View onTouchEnd={toggleOverlay} style={{borderRadius:10, padding:15, justifyContent: 'space-between', height: 110}}>
                                    <Text style={{fontSize: 20, fontFamily:"PoppinsSemiBold"}}>Taxa - Outubro</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsRegular", color:"#ADADAD"}}>Venc. 05/12/2022</Text>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#E91429"}}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text style={{fontSize: 30, fontFamily:"PoppinsExtraBold"}}>Histórico</Text>
                <View style={{height:300}}>
                    <ScrollView bounces={true} showsVerticalScrollIndicator={false} centerContent={true}>

                        <Card containerStyle={{padding:0, width:345, height:110, borderStartColor: "#1DB954", borderStartWidth: 20 ,border: 0,borderWidth: 0, marginTop:15, marginEnd: 30, margin:0, borderRadius: 10}}>
                            <View onTouchEnd={toggleOverlay} style={{borderRadius:10, padding:15, justifyContent: 'space-between', height: 110}}>
                                    <Text style={{fontSize: 20, fontFamily:"PoppinsSemiBold"}}>Taxa - Novembro</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsRegular", color:"#ADADAD"}}>Venc. 05/12/2022</Text>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#1DB954"}}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                        <Card containerStyle={{padding:0, width:345, height:110, borderStartColor: "#1DB954", borderStartWidth: 20 ,border: 0,borderWidth: 0, marginTop:15, marginEnd: 30, margin:0, borderRadius: 10}}>
                            <View onTouchEnd={toggleOverlay} style={{borderRadius:10, padding:15, justifyContent: 'space-between', height: 110}}>
                                    <Text style={{fontSize: 20, fontFamily:"PoppinsSemiBold"}}>Taxa - Novembro</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsRegular", color:"#ADADAD"}}>Venc. 05/12/2022</Text>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#1DB954"}}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                        <Card containerStyle={{padding:0, width:345, height:110, borderStartColor: "#1DB954", borderStartWidth: 20 ,border: 0,borderWidth: 0, marginTop:15, marginEnd: 30, margin:0, borderRadius: 10}}>
                            <View onTouchEnd={toggleOverlay} style={{borderRadius:10, padding:15, justifyContent: 'space-between', height: 110}}>
                                    <Text style={{fontSize: 20, fontFamily:"PoppinsSemiBold"}}>Taxa - Novembro</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsRegular", color:"#ADADAD"}}>Venc. 05/12/2022</Text>
                                        <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#1DB954"}}>R$ 40,00</Text>
                                    </View>
                            </View>
                        </Card> 
                    </ScrollView>
                </View>
            </View>


            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                <View>
                    <Text style={{fontSize: 25, fontFamily:"PoppinsSemiBold"}}>Taxa - Novembro</Text>
                    <Text style={{fontSize: 20, fontFamily:"PoppinsSemiBold", color:"#ADADAD"}}>05/12/2022</Text>
                </View>
                <Input
                    value='e6eae6fd-c638-458e-bbbb-c638c638-c638'
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={{fontFamily:"PoppinsSemiBold",height: 50}}
                    disabled={true}
                    disabledInputStyle={{color:"#000000"}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                />

                <Button
                    buttonStyle= {{
                        backgroundColor: "#1DB954",
                        borderRadius:10,
                        width:350,
                        height:50
                    }}
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
                    titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold", paddingStart:5}}
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
        width:'100%',
        height:360,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        position:'absolute',
        bottom:0,
        justifyContent: 'space-evenly',
        alignItems:'flex-start',
        paddingStart: 15
    }
});