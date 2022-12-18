import { IonBadge, IonIcon, IonLabel, IonNav, IonRouterLink, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { calendar, home, homeOutline, hourglassOutline, informationCircle, map, personCircle, settingsOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router";
import { firebaseAuth, firebaseStore } from "../../redux/firebase/firebaseSlice";
import { updateDevices } from "../../redux/user/userSlice";
import Home from "./Home";
import Settings from "./Settings/Settings";
import Usage from "./Usage/Usage";

let HomeIndex = ()=>{
    let dispatch = useDispatch()
    useEffect(()=>{
        // const docRef = doc(, "cities", "SF");

    },[])
    return <div>
        <IonNav root={()=>
        <IonTabs>
            
            <IonRouterOutlet>
                <Route exact path="/home/"><Home /></Route>
                <Route path="/home/usage"><Usage /></Route>
                <Route path="/home/settings"> <Settings /> </Route>   
                {/* <Route exact path='/'><div><IonRouterLink href="/home" /></div></Route>  */}
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home/">
                    <IonIcon icon={homeOutline} />
                    <IonLabel>Home</IonLabel>
                    <IonBadge>6</IonBadge>
                </IonTabButton>

                <IonTabButton tab="usage" href="/home/usage">
                    <IonIcon icon={hourglassOutline} />
                    <IonLabel>Usage</IonLabel>
                </IonTabButton>

                <IonTabButton tab="settings" href="/home/settings">
                    <IonIcon icon={settingsOutline} />
                    <IonLabel>Settings</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>}></IonNav>
    </div>
}
export default HomeIndex;