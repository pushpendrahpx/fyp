import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRouterLink, IonRow, IonText, useIonRouter, useIonToast } from "@ionic/react";
import { getAuth } from "firebase/auth";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { firebaseAuth, firebaseStore } from "../../redux/firebase/firebaseSlice";
import { RootState } from "../../redux/store";
import { saveUser } from "../../redux/user/userSlice";

const Login: React.FC = () => {
    let [formState,setFormState] = useState({
        email: "",
        password:""
    })
    useEffect(()=>{
        setFormState({
            email: "askillys@gmail.com",
            password:"googleuser"
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

            router.push('/home')
        })
    }
    return (
        <>
            <IonGrid style={{textAlign:'center'}}>
                <IonRow>
                    <IonCol>
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
  