import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonItemDivider, IonLabel, IonRouterLink, IonRow, IonText, useIonRouter, useIonToast } from "@ionic/react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, updateCurrentUser } from "firebase/auth";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../Class/User";

import { firebaseAuth, firebaseStore } from "../../redux/firebase/firebaseSlice";
import { saveUser } from "../../redux/user/userSlice";

const Signup : React.FC = () => {
    let [formState,setFormState] = useState({
        name:"",
        email: "",
        password:""
    })

    useEffect(()=>{
        setFormState({
            name:"SUDJ",
            email: "askillysd@gmail.com",
            password:"googleuser"
        })
    },[])
    
    let router = useIonRouter()
    let [present] = useIonToast()
    let dispatch = useDispatch()

    
    let onInputChange = (type: string, e:any)=>{
        setFormState(prev=>{
            return {...prev, [type]:e.target.value}
        })  
    }
    let formSubmitHandle = (e:FormEvent)=>{
        e.preventDefault();
        console.log(e.target)
        firebaseAuth.createUserWithEmailAndPassword(firebaseAuth.getAuth(), formState.email, formState.password)
        .then((user)=>{
            present({
                message: `Hello ${user.user.email}!`,
                duration: 1500,
                position: 'bottom'
              });
            let userobj = JSON.parse(JSON.stringify( new User(user.user)))
            
              let doc = firebaseStore.doc(firebaseStore.collection(firebaseStore.getFirestore(), 'users'),user.user.uid);
            //   firebaseStore.addDoc(firebaseStore.collection(firebaseStore.getFirestore(), 'users'), userobj)
              firebaseStore.setDoc(doc,userobj)
             
            //   updateProfile(user,)
            console.log(user)
            dispatch(saveUser(user))
            
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <>
            <IonGrid  style={{textAlign:'center'}}>
                <IonRow>
                    <IonCol>
                    <IonText color="primary">
                        <h1>Final Year Project : Signup</h1>
                    </IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        
                       <form>
                        <IonItem>
                                <IonInput placeholder="Name" value={formState.name} onIonChange={(e)=>onInputChange('name',e)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Email" value={formState.email} onIonChange={(e)=>onInputChange('email',e)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Password" value={formState.password} onIonChange={(e)=>onInputChange('password',e)}></IonInput>
                            </IonItem>

                            <IonButton onClick={formSubmitHandle}>Signup</IonButton>
                            <br />
                            <IonRouterLink routerLink="/login">
                                <IonButton> Go to Login </IonButton>
                            </IonRouterLink>
                       </form>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
  };
  
  export default Signup;
  