import {
  IonApp,
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRippleEffect,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { logOutOutline, star } from "ionicons/icons";
import { RootState } from "../../../redux/store";
import { firebaseAuth } from "../../../redux/firebase/firebaseSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../../../redux/user/userSlice";
let Settings = () => {
  let state = useSelector((state: RootState) => state.userReducer);
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  let dispatch = useDispatch();
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ textAlign: "center" }}>
        <div style={{ textAlign: "center" }}>
          <IonAvatar
            style={{ textAlign: "center", margin: "20px auto 5px auto" }}
          >
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <IonText>
            <IonChip outline={true}>
              {state.creds.email ? state.creds.email : state.creds.user.email} -{" "}
              {state.creds.emailVerified ? "✅ Verified" : "❌ Not Verified"}
            </IonChip>
          </IonText>
        </div>

        <IonButton
          expand="block"
          style={{ margin: "0 40px 0 40px" }}
          color={"danger"}
          onClick={() =>
            presentAlert({
              header: "Really want to logout ?",
              buttons: [
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: () => {
                    setHandlerMessage("Alert canceled");
                  },
                },
                {
                  text: "Logout",
                  role: "confirm",
                  handler: () => {
                    firebaseAuth.signOut(firebaseAuth.getAuth()).then(() => {
                      dispatch(signOut);
                    });
                    setHandlerMessage("Alert confirmed");
                  },
                },
              ],
              onDidDismiss: (e: CustomEvent) =>
                setRoleMessage(`Dismissed with role: ${e.detail.role}`),
            })
          }
        >
          <IonIcon name={logOutOutline}></IonIcon>
          Logout
        </IonButton>
      </IonContent>
    </IonApp>
  );
};
export default Settings;
