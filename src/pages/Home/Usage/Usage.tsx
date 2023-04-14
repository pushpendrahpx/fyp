import { IonApp, IonCard, IonChip, IonContent, IonHeader, IonImg, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import ImgAsset from "./../../../assets/img.jpeg";

let Usage = ()=>{
    return <IonApp>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Usage</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent style={{textAlign:"center"}}>
            <IonImg src={ImgAsset} alt={'img'}></IonImg>
            <IonTitle>
            <IonChip>Your Energy Consumption will be shown here</IonChip>
            </IonTitle>
        </IonContent>
        </IonApp>
}
export default Usage;