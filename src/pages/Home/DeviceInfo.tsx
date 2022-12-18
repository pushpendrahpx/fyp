import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
let DeviceInfo = (props:any)=>{
    let state = useSelector((state:RootState)=>state).userReducer.devices;
    console.log(state)
    return <>
    <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton></IonBackButton>
            </IonButtons>
          <IonTitle>{'sdfg'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

            <IonCard>
                   {props.device.name}
                <IonInput placeholder="Enter device id"></IonInput>
                <IonInput placeholder="Enter device name"></IonInput>
                
                <div style={{textAlign:'center'}}>
                
                <IonButton>Save</IonButton>
                </div>

            </IonCard>

      </IonContent></>
}
export default DeviceInfo;