import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Icon, Image, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';
import mime from 'mime';
import * as Progress from 'react-native-progress'

export default function AlterarImgCondominio({navigation, route}) {

    const [Imagem,setImagem] = useState()
    const [nomeImagem, setNomeImagem] = useState();
    const [validar, setValidar] = useState(false);
    const [erroForm, setErroForm] = useState('');

    const [spin, setSpin] = useState(false);
    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });

      function validarCampos(){
        if(erroForm=='' && Imagem!= ''){
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
    async function CapturaImgCondominio() {
      setErroForm("");
      try {
        const res = await DocumentPicker.getDocumentAsync({
          type: "image/jpeg",
        });
        if (res.name != null) {
          setNomeImagem(res.name);
          setImagem(res);
        }
      } catch (err) {
        console.log(err);
        setErroForm("Selecione um arquivo válido");
      }
    }

    function AlterarFoto(imagem){
        if(validar){
            setSpin(true)
          var bodyFormData = new FormData();
              bodyFormData.append("file", {
                  uri: imagem.uri,
                  name: imagem.name,
                  type: mime.getType(imagem.uri)
              })
              bodyFormData.append("unionIdentifier", route.params.idCondominio)
              var axionConfig = { 
                  method: "post",
                  url: global.baseURL+"/union/condominium/photo-profile",
                  responseType: "json",
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
                  transformRequest: (bodyFormData) => { return bodyFormData},
                  data: bodyFormData,
              };
  
              axios.request(axionConfig)
              .then((response) => {
                    setSpin(false)
                  navigation.navigate("Feedback", {
                      tipo : true,
                      retornoEspecifico: true,
                      mensagem : "Foto alterada com sucesso!",
                      textoBotao : "Página Inicial",
                      destinoBotao : "Home"
                  })
              }).catch((error) =>{
                setSpin(false)
                  if(error.response != undefined){
                      console.log(error.response.data.message)
                  }
                  navigation.navigate("Feedback", {
                      tipo : false,
                      retornoEspecifico: true,
                      mensagem : "Ocorreu um erro inesperado no sistema!",
                      textoBotao : "Pagina Inicial",
                      destinoBotao: "Home"
                  })
              })
          }else{
              setErroForm('Selecione um arquivo válido')
          }
      }

    return (
        <View style={styles.container}>
            <Icon
                name="home-city-outline"
                type='material-community'
                color="#1DB954"
                size={200}
            />
            <View style={styles.flexTitle}>
                <Text style={styles.titulos.titulo}>Selecione uma foto</Text>
                <Text style={styles.titulos.subtitulo}>São aceitos arquivo .jpg, .jpeg, .jfif, .pjpeg e .pjp.</Text>
            </View>

            <View>
                <Text style={styles.input.label}>Imagem Condominio</Text>
                <TouchableOpacity onPress={()=>CapturaImgCondominio()}>
                    <View pointerEvents='none'> 
                        <Input
                            pointerEvents='none'
                            placeholder='selecione um arquivo'
                            inputContainerStyle={styles.input.inputContainerStyle}
                            inputStyle={styles.input.inputStyle}
                            containerStyle={styles.input.containerStyle}
                            style={styles.input.style}
                            disabled={true}
                            value={nomeImagem != null ? nomeImagem : ""}
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
            
                
            
            <Button
                buttonStyle= {styles.button.buttonStyle}
                style={styles.input.style}
                title={spin != false ?
                    <Progress.Circle size={25} indeterminate={true} borderWidth={3} color={'#f6f7f9'} />: 'Alterar Foto'}
                raised="true"
                onPress={()=>AlterarFoto(Imagem)}
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

});