import {
  IonApp,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNav,
  IonNavLink,
  IonRippleEffect,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  firebaseAuth,
  firebaseRTDB,
  firebaseStore,
} from "../../redux/firebase/firebaseSlice";
import { RootState } from "../../redux/store";
import { updateDevice, updateDevices } from "../../redux/user/userSlice";
import AddDevice from "./AddDevice";
import DeviceInfo from "./DeviceInfo";

// firebaseStore.onSnapshot(firebaseStore.doc(firebaseStore.getFirestore(),"users",String(firebaseAuth.getAuth().currentUser?.uid)),(doc)=>{
//     console.log(doc.data())
//     dispatch(updateDevices(doc.data()?.devices))

// })
let Home = () => {
  let [present] = useIonToast();
  let dispatch = useDispatch();
  let state = useSelector((state: RootState) => state.userReducer);
  let [devices, setDevices] = useState<any>([]);

  // useEffect(()=>{})
  useEffect(() => {
    // const starCountRef = firebaseRTDB.ref(firebaseRTDB.getDatabase(), "switch");
    // firebaseRTDB.onValue(starCountRef, (snapshot) => {
    //   // console.log(snapshot)
    //   const data = snapshot.val();
    //   // console.log(data)
    //   setSwitches(data);
    // });
    // let currentRef = firebaseRTDB.ref(firebaseRTDB.getDatabase(), "sensor");
    // firebaseRTDB.onValue(currentRef, (snapShot) => {
    //   setCurrent(snapShot.val());
    // });
    // firebaseStore.onSnapshot(
    //   firebaseStore.doc(
    //     firebaseStore.getFirestore(),
    //     "users",
    //     String(firebaseAuth.getAuth().currentUser?.uid)
    //   ),
    //   (doc) => {
    //     // console.log(doc.data())
    //     setDevices(doc.data()?.devices);
    //     dispatch(updateDevices(doc.data()?.devices));
    //   }
    // );
    // return () => {
    //   setDevices([]);
    // };
  }, []);
  useEffect(() => {
    console.log(state);
  }, [state.devices]);

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  //   useEffect(() => {
  //     console.log(switches);
  //     Object.keys(switches).forEach((value, index) => {
  //       firebaseRTDB.set(
  //         firebaseRTDB.ref(firebaseRTDB.getDatabase(), "switch"),
  //         {}
  //       );
  //     });
  //   }, [switches]);
  let handleSwitch = (eachDevice: any) => {
    dispatch(updateDevice({ ...eachDevice, status: !eachDevice.status }));
    // setSwitches((prev: any) => {
    //   return {
    //     ...prev,
    //     ["sw_" + String(Number(eachIndex) + 1)]:
    //       !prev["sw_" + String(Number(eachIndex) + 1)],
    //   };
    // });
  };

  return (
    <IonApp>
      <IonHeader style={{ position: "sticky" }}>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList style={{ overflowY: "scroll" }}>
          <IonNavLink routerDirection="forward" component={() => <AddDevice />}>
            <IonCard
              id="open-modal"
              className="ion-activatable ripple-parent rounded-rectangle"
              onClick={() => {
                present({
                  message: `Add new device not working`,
                  duration: 1500,
                  position: "bottom",
                });
              }}
            >
              <IonRippleEffect></IonRippleEffect>
              <IonCardHeader>
                <IonCardTitle>Add New Device</IonCardTitle>
              </IonCardHeader>
            </IonCard>

            <IonModal
              ref={modal}
              trigger="open-modal"
              onWillDismiss={(ev) => onWillDismiss(ev)}
            >
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => modal.current?.dismiss()}>
                      Cancel
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Add Device</IonTitle>
                  <IonButtons slot="end">
                    <IonButton strong={true} onClick={() => confirm()}>
                      Confirm
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <IonItem>
                  <IonLabel position="stacked">Enter your device id</IonLabel>
                  <IonInput
                    ref={input}
                    type="text"
                    placeholder="Your Device ID"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Enter your device name</IonLabel>
                  <IonInput
                    ref={input}
                    type="text"
                    placeholder="Your Device Name"
                  />
                </IonItem>
                <IonButton expand="full"> Add </IonButton>
              </IonContent>
            </IonModal>
          </IonNavLink>

          {state.devices.map((eachDevice: any, eachIndex: React.Key) => {
            return (
              <IonNavLink
                key={eachIndex + eachDevice.id}
                routerDirection="forward"
                component={() => <DeviceInfo device={eachDevice} />}
              >
                <IonCard className="ion-activatable ripple-parent rounded-rectangle">
                  <IonRippleEffect></IonRippleEffect>
                  <IonCardHeader>
                    <IonCardTitle style={{ textTransform: "capitalize" }}>
                      {eachDevice.name}
                    </IonCardTitle>
                    <IonCardSubtitle>
                      {eachDevice.id} - {eachDevice.status ? "🟢 ON" : "🔵 OFF"}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton onClick={() => handleSwitch(eachDevice)}>
                      Turn {eachDevice.status ? "OFF" : "ON"}
                    </IonButton>
                    <br />
                    CurrentValue - {eachDevice.current}
                    <br />
                    Timestamp -{" "}
                    {new Date(eachDevice.timeStamp).toLocaleTimeString()}{" "}
                    {new Date(eachDevice.timeStamp).toDateString()}
                  </IonCardContent>
                </IonCard>
              </IonNavLink>
            );
          })}
        </IonList>
      </IonContent>
    </IonApp>
  );
};
export default Home;
