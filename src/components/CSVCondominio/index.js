import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';
import mime from 'mime';

export default function CSVCondominio({navigation, route}) {

    const [Csv,setCSV] = useState()
    const [nomeCsv, setNomeCSV] = useState();
    const [erroForm, setErroForm] = useState('');
    const [validar, setValidar] = useState(false);
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });
    function validarCampos(){
        if(erroForm==''){
            setValidar(true);
        }else{
            setValidar(false)
        }
    }
    useEffect(()=>{
        validarCampos()
    })
      if (!loaded) {
        return null;
      }
    function AdicionarMoradores(csvMoradores){
        if(csvMoradores != null && validar){
            var bodyFormData = new FormData();
            bodyFormData.append("tenants", {
                uri: csvMoradores.uri,
                name: csvMoradores.name,
                type: mime.getType(csvMoradores.uri)
            })
            var axionConfig = { 
                method: "post",
                url: global.baseURL+":8080/union/condominium/" + route.params.idCondominio + "/tenant",
                responseType: "json",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token' : global.sessionID
                    // if backend supports u can use gzip request encoding
                    // "Content-Encoding": "gzip",
                },
                transformRequest: (bodyFormData) => { return bodyFormData},
                data: bodyFormData,
            };
            axios.request(axionConfig)
            .then((response) => {
                navigation.navigate("Feedback", {
                    tipo : true,
                    retornoEspecifico: true,
                    mensagem : "Moradores adicionados com sucesso!",
                    textoBotao : "Página Inicial",
                    destinoBotao : "Home"
                })
            }).catch((err) =>{
                console.log(err)
            })
        }else{
            setErroForm('Selecione um arquivo válido')
        }
        
    }
    async function CapturaCSVMoradores() {
        setErroForm('')
        try{
            const  res = await DocumentPicker.getDocumentAsync({})

            if(res.name != null){
                setNomeCSV(res.name)
                setCSV(res)
                
            }else{
                setErroForm('Selecione um arquivo válido')
            }
        }catch (err){
            console.log(err);
            setErroForm('Selecione um arquivo válido')
        }
    }



    return (
        <View style={styles.container}>
            <Icon
                name="file-table-outline"
                type='material-community'
                color="#1DB954"
                size={200}
            />
            <View style={styles.flexTitle}>
                <Text style={styles.titulos.titulo}>Adicione Moradores</Text>
                <Text style={styles.titulos.subtitulo}>O CSV deve conter uma coluna com os emails dos moradores e outra com o nímero da residencia.</Text>

            </View>

            <View>
                <Text style={styles.input.label}>CSV dos moradores</Text>
                <TouchableOpacity onPress={()=>CapturaCSVMoradores()}>
                    <View pointerEvents='none'> 
                        <Input
                            pointerEvents='none'
                            placeholder='selecione um arquivo'
                            inputContainerStyle={styles.input.inputContainerStyle}
                            inputStyle={styles.input.inputStyle}
                            containerStyle={styles.input.containerStyle}
                            style={styles.input.style}
                            disabled={true}
                            value={nomeCsv != null ? nomeCsv : ""}
                            rightIcon={
                                <Icon
                                    name="upload"
                                    size={25}
                                    type="font-awesome"
                                    color="#1DB954"
                                />
                            }
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View>
            <Text style={styles.errorMessage}>{erroForm}</Text>
                
            
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.input.style}
                title="Adicionar Moradores"
                raised="true"
                onPress={()=>AdicionarMoradores(Csv)}
                containerStyle={styles.button.containerStyle}
                titleStyle={styles.button.titleStyle}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    flexTitle:{
        paddingStart:25, 
        alignSelf:'flex-start'
    },
    titulos:{
        titulo:{
            fontSize: 25,
            marginTop:50, 
            fontFamily:"PoppinsExtraBold", 
            textAlign: 'center'
        },
        subtitulo:{
            fontSize: 14, 
            fontFamily:"PoppinsRegular", 
            color:"#ADADAD", 
            textAlign: 'center'
        }
    },
    input:{
        label:{
            fontSize: 20, 
            fontFamily:"PoppinsExtraBold", 
            color:"#000000"
        },
        inputContainerStyle:{
            borderBottomWidth: 0, 
            alignItems: 'center'
        },
        inputStyle:{
            fontFamily:"PoppinsRegular",
            height: 55
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
    button:{
        buttonStyle:{
            backgroundColor: "#1DB954",
            borderRadius:10,
            width: 350
        },
        containerStyle:{
            borderRadius:10
        },
        titleStyle:{
            color:"#FFF", 
            fontFamily:"PoppinsExtraBold"
        }
    },
    errorMessage:{
        color:'red',
    }
});