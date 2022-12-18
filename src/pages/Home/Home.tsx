import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonHeader, IonNav, IonNavLink, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { firebaseAuth, firebaseStore } from "../../redux/firebase/firebaseSlice";
import { RootState } from "../../redux/store";
import { updateDevices } from "../../redux/user/userSlice";
import AddDevice from "./AddDevice";
import DeviceInfo from "./DeviceInfo";

// firebaseStore.onSnapshot(firebaseStore.doc(firebaseStore.getFirestore(),"users",String(firebaseAuth.getAuth().currentUser?.uid)),(doc)=>{
//     console.log(doc.data())
//     dispatch(updateDevices(doc.data()?.devices))

    
    
// })
let Home = ()=>{

    let dispatch = useDispatch()
    let state = useSelector((state:RootState)=>state.userReducer);
    let [devices,setDevices] = useState<any>([]);
    // useEffect(()=>{})
    useEffect(()=>{
        setDevices(state.devices);
        
        return ()=>{
            setDevices([])
        }
    },[]);
    return <div>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Home</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonGrid>  
                    
                    <IonNavLink routerDirection="forward" component={() => <AddDevice />}>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Add New Device</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonNavLink>
                    {devices.map((eachDevice:any,eachIndex:React.Key)=>{
                        return <IonNavLink key={eachIndex} routerDirection="forward" component={() => <DeviceInfo device={eachDevice} />}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle style={{textTransform:'capitalize'}}>{eachDevice.id}</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>
                                </IonCard>
                        </IonNavLink>
                    })}
        </IonGrid>
        </div>
}
export default Home;