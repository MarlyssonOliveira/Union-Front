import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Button, Image, Input } from 'react-native-elements';
import { useState, useEffect } from 'react';

export default function CadastroDados({navigation}) {

    const [Nome,setNome] = useState();
    const [Email,setEmail] = useState();
    const [Telefone,setTelefone] = useState();

    const [erroNome,setErroNome] = useState();
    const [erroEmail,setErroEmail] = useState();
    const [erroTelefone,setErroTelefone] = useState();
    const [errorMessage,setErroMessage] = useState();


    const [validar, setValidar] = useState(false);


    function ProximoPassoCadastro(){
        if(validar){
            const NovoUsuario = {
                nome: Nome,
                email: Email,
                telefone: Telefone,
              };
          
              navigation.navigate("CadastroSeguranca", {
                usuario: NovoUsuario,
              });
        }else{
            setErroMessage('Preencha os campos corretamente')
        }
        
      
    }

    const [loaded] = useFonts({
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf")

      });

    function validarCampos(){
        if(erroTelefone=='' && erroEmail=='' && erroNome==''){
            setValidar(true);
        }else{
            setValidar(false)
        }
        // console.log(validar)
    }
    function validaTelefone(tel){
        const regex = /^[0-9]*$/;
        if(tel=='' || tel==undefined){
            setErroTelefone('Campo não pode ficar vazio')
        }else if(!regex.test(tel)){
            setTelefone(tel.replace(regex,''));
            setErroTelefone('Formato Incorreto')
        }else{
            setErroTelefone('')
        }
    }

    function validadorEmail(email){
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(email=="" || !regex.test(email)){
            setErroEmail('Preencha corretamente')
        }else{
            setErroEmail('')
        }
    }
    function validaNome(nome) {
        const regexp = /[^a-zA-Z\+wÀ-ú ]/g;
        const palavras = nome.trim().split(" ").length
        if(nome=='' || nome==undefined){
            setErroNome('Preencha o nome corretamente')
        }else if(regexp.test(nome) || palavras < 2){
            setErroNome('Preencha o nome corretamente')
        }else{
            setErroNome('')
        }
    }

    useEffect(()=>{
        validarCampos()
    })

    // useEffect(()=>{
    //     validaTelefone('')
    // })
    
      if (!loaded) {
        return null;
      }



    return (
        <View style={styles.container}>
            <View style={{alignSelf:'flex-start', paddingStart:25}}>
                <Text style={{fontSize: 30, fontFamily:"PoppinsExtraBold"}}>Cadastro</Text>
                <Text  style={{fontSize: 16, fontFamily:"PoppinsMedium"}}>informações pessoais e de contato</Text>
            </View>
            
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>Nome completo</Text>
                <Input
                    placeholder='Digite seu nome'
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={{fontFamily:"PoppinsRegular",height: 55}}
                    onChangeText={(nome) => {
                        setNome(nome)
                        validaNome(nome)
                        setErroMessage('')
                    }}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                    errorMessage={erroNome}
                />
            </View>
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>E-mail</Text>
                <Input
                    placeholder='Digite seu e-mail'
                    inputStyle={{fontFamily:"PoppinsRegular", height: 55}}
                    onChangeText={(email) => {
                        setEmail(email)
                        validadorEmail(email);
                        setErroMessage('')
                    }}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10,height: 50}}
                    style={{alignSelf:"center"}}
                    errorMessage={erroEmail}
                />
            </View>
            <View>
                <Text style={{fontSize: 20, fontFamily:"PoppinsExtraBold", color:"#000000"}}>Telefone</Text>
                <Input
                    placeholder='(xx)x.xxxx-xxxx'
                    onChangeText={(telefone) => {
                        setTelefone(telefone)
                        validaTelefone(telefone)
                        setErroMessage('')
                        // validarCampos();
                    }}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={{fontFamily:"PoppinsRegular",height: 55}}
                    containerStyle={{width: 350, backgroundColor:"#F0F1F5", borderRadius: 10, height: 50}}
                    style={{alignSelf:"center"}}
                    errorMessage={erroTelefone}
                    keyboardType='phone-pad'
                    value={Telefone}
                />
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Button
                buttonStyle= {{
                    backgroundColor: "#1DB954",
                    borderRadius:10,
                    width: 350
                }}
                style={{alignSelf:"center"}}
                title="Próxima etapa"
                raised="true"
                onPress={()=>{ProximoPassoCadastro()}}
                containerStyle={{
                    borderRadius:10
                }}
                titleStyle={{color:"#FFF", fontFamily:"PoppinsExtraBold"}}
            />
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
    errorMessage:{
        color:'red',
    }
});