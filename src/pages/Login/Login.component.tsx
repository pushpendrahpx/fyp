import { IonButton, IonCol, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonRouterLink, IonRow, IonText, useIonLoading, useIonRouter, useIonToast } from "@ionic/react";
import { getAuth } from "firebase/auth";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { firebaseAuth, firebaseStore } from "../../redux/firebase/firebaseSlice";
import { RootState } from "../../redux/store";
import { saveUser } from "../../redux/user/userSlice";
import SaveEnergySVG from "./../../assets/saveenergy.svg"
const Login: React.FC = () => {

  const [presentLoading, dismiss] = useIonLoading();
    let [formState,setFormState] = useState({
        email: "",
        password:""
    })
    useEffect(()=>{
        setFormState({
            email: "u19ee003@eed.svnit.ac.in",
            password:"test123"
        })
    },[])
    let router = useIonRouter()
    let [present] = useIonToast()
    let state = useSelector((state:RootState) =>state)
    let dispatch = useDispatch();
    useEffect(()=>{ 
        console.log(formState,state)
    },[formState]);
    
    let onInputChange = (type: string, e:any)=>{
        setFormState(prev=>{
            return {...prev, [type]:e.target.value}
        })  
    }
    let formSubmitHandle = (e:FormEvent)=>{
        e.preventDefault();
        presentLoading({
            message: 'Trying to log in'
          })
        console.log(e.target)
        firebaseAuth.signInWithEmailAndPassword(firebaseAuth.getAuth(), formState.email, formState.password)
        .then((user)=>{
            
            present({
                message: `Hello ${user.user.email}!`,
                duration: 1500,
                position: 'bottom'
              });
            //   firebaseStore.addDoc(doc,{name:'posd'}).then(()=>{console.log('SAVED')}).catch(()=>{console.log('NOT SAVED')})
            console.log(user)
            dispatch(saveUser(user))

            dismiss()
            router.push('/home')
        })
        .catch(error=>{
             
            dismiss()
            present({
                message: error,
                duration: 1500,
                position: 'bottom'
              });
        })
    }
    return (
        <>
            <IonGrid style={{textAlign:'center'}}>
                <IonRow>
                    <IonCol>
                        <IonImg src={SaveEnergySVG} alt={'brand'}></IonImg>
                    <IonText color="primary">
                        <h1>Final Year Project : Login</h1>
                    </IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>

                        <form>
                            <IonItem>
                                <IonInput placeholder="Email" value={formState.email} onIonChange={(e)=>onInputChange('email',e)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Password" value={formState.password}  onIonChange={(e)=>onInputChange('password',e)}></IonInput>
                            </IonItem>

                            <IonButton onClick={formSubmitHandle}>Login</IonButton>
                            <br />
                            <IonRouterLink routerLink="/signup">
                                <IonButton>Go to Signup</IonButton>
                            </IonRouterLink>
                        </form>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
  };
  
  export default Login;
  