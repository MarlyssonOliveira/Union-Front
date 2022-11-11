import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Image, Input, Icon, Avatar, SpeedDial, Card, Button  } from 'react-native-elements';
import { useState } from 'react';

export default function AdmCondominio({navigation}) {

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
            <Card key={i} containerStyle={{padding:0, width:345, border: 0,borderWidth: 0, marginTop:15, marginEnd: 30, margin:0, borderRadius: 10}}>
                <View backgroundColor="#EFF3FF" style={{borderRadius:10, padding:15}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Avatar
                            rounded
                            size="medium"
                            source={require('../../assets/images/user.jpg')}
                        />
                        <Text  style={{fontSize: 14, fontFamily:"PoppinsExtraBold", paddingHorizontal:15}}>Usuario</Text>
                    </View>
                    <Text style={{fontSize: 12,color: "#000", fontFamily:"PoppinsRegular", paddingTop:10}}>Esse ipsum qui ipsum ea. Lorem labore minim occaecat sint cillum qui voluptate. Dolore aliqua adipisicing occaecat magna pariatur fugiat tempor irure pariatur tempor mollit excepteur eiusmod proident. Id do ea tempor commodo labore anim ea elit aliquip occaecat aliquip sit eu.dolor do anim deserunt ut eiusmod labore sint minim. Non mollit qui magna aliquip.</Text>
                </View>
            </Card> 
        )
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{alignSelf: 'flex-start', paddingStart: 25}}>
                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        <Image
                            source={require('../../assets/images/predio.jpg')}
                            style={{width: 110, height: 110, borderRadius:10}}
                            
                        />
                        <View style={{paddingStart:15}}>
                            <Text style={{fontSize: 24, fontFamily:"PoppinsExtraBold"}}>Bloco 24</Text>
                            <Text style={{fontSize: 16, fontFamily:"PoppinsMedium", color:"#ADADAD"}}>Avenida um, 230</Text>
                            <Button
                                buttonStyle= {{
                                    backgroundColor: "#1DB954",
                                    borderRadius:10,
                                    alignItems: 'center'
                                }}
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
                                containerStyle={{
                                    borderRadius:10
                                }}
                                titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold", paddingStart:5}}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginTop:30}}>
                    <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold"}}>Últimas atualizações</Text>
                    <View style={{height:450, paddingVertical:10}}>
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
                    style={{width:40}}
                    buttonStyle={{width:55, height: 55,backgroundColor:"#1DB954"}}
                    icon={{ name: 'message', color: '#fff', size:35 }}
                    iconContainerStyle= {{backgroundColor:"#1DB954", width:55, height: 55}}
                    title="Nova mensagem" 
                    onPress={() => navigation.navigate('NovaMensagem')}
                />
                <SpeedDial.Action
                    style={{width:40}}
                    buttonStyle={{width:55, height: 55,backgroundColor:"#1DB954"}}
                    icon={{ name: 'currency-usd', color: '#fff', size:35, type:"material-community"  }}
                    iconContainerStyle= {{backgroundColor:"#1DB954",width:55, height: 55,}}
                    title="Nova taxa"
                    onPress={() => navigation.navigate('NovaTaxa')}
                />
                <SpeedDial.Action
                    style={{width:40}}
                    buttonStyle={{width:55, height: 55,backgroundColor:"#1DB954"}}
                    icon={{ name: 'delete', color: '#fff', size:35 }}
                    iconContainerStyle= {{backgroundColor:"#E91429", width:55, height: 55}}
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
});