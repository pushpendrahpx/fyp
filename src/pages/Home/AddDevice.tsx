import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonNavLink, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
let AddDevice = ()=>{
    return <>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton></IonBackButton>
            </IonButtons>
          <IonTitle>Add New Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

            <IonCard>
                   
                <IonInput placeholder="Enter device id"></IonInput>
                <IonInput placeholder="Enter device name"></IonInput>
                
                <div style={{textAlign:'center'}}>
                
                <IonButton>Save</IonButton>
                </div>

            </IonCard>

      </IonContent>
    </>
}
export default AddDevice;
