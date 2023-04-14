import {
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonRouterLink,
  IonRow,
  IonText,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  updateCurrentUser,
} from "firebase/auth";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../Class/User";

import {
  firebaseAuth,
  firebaseStore,
  firebaseRTDB,
} from "../../redux/firebase/firebaseSlice";
import { saveUser } from "../../redux/user/userSlice";

import SaveEnergySVG from "./../../assets/saveenergy.svg";
import { ref, set } from "firebase/database";
const Signup: React.FC = () => {
  const [presentLoading, dismiss] = useIonLoading();
  let [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormState({
      name: "Pushpendra Vishwakarma",
      email: "u19ee003@eed.svnit.ac.in",
      password: "test123",
    });
  }, []);

  let router = useIonRouter();
  let [present] = useIonToast();
  let dispatch = useDispatch();

  let onInputChange = (type: string, e: any) => {
    setFormState((prev) => {
      return { ...prev, [type]: e.target.value };
    });
  };
  let formSubmitHandle = (e: FormEvent) => {
    e.preventDefault();

    presentLoading({
      message: "Creating your account...",
    });
    firebaseAuth
      .createUserWithEmailAndPassword(
        firebaseAuth.getAuth(),
        formState.email,
        formState.password
      )
      .then((user) => {
        present({
          message: `Hello ${user.user.email}!`,
          duration: 1500,
          position: "bottom",
        });
        let userobj = JSON.parse(JSON.stringify(new User(user.user)));
        //   console.log(userobj)
        let doc = firebaseStore.doc(
          firebaseStore.collection(firebaseStore.getFirestore(), "users"),
          user.user.uid
        );
        //   firebaseStore.addDoc(firebaseStore.collection(firebaseStore.getFirestore(), 'users'), userobj)
        firebaseStore.setDoc(doc, userobj);
        firebaseRTDB.getDatabase();
        //   updateProfile(user,)
        const db = firebaseRTDB.getDatabase();
        console.log(String(user?.user?.email).split("@")[0]);
        set(ref(db, "devices/" + user?.user?.uid), [
          {
            id: 0,
            name: "Device 0",
            current: Math.random(),
            status: false,
            timeStamp: new Date().getTime(),
          },
          {
            id: 1,
            name: "Device 1",
            current: Math.random(),
            status: false,
            timeStamp: new Date().getTime(),
          },
          {
            id: 2,
            name: "Device 2",
            current: Math.random(),
            status: false,
            timeStamp: new Date().getTime(),
          },
          {
            id: 3,
            name: "Device 3",
            current: Math.random(),
            status: false,
            timeStamp: new Date().getTime(),
          },
        ]);
        // set(
        //   ref(db, "devices/" + String(user?.user?.email).split("@")[0] + "1"),
        //   {
        //     current: 0,
        //     status: false,
        //     timeStamp: new Date().getTime(),
        //   }
        // );
        // set(
        //   ref(db, "devices/" + String(user?.user?.email).split("@")[0] + "2"),
        //   {
        //     current: 0,
        //     status: false,
        //     timeStamp: new Date().getTime(),
        //   }
        // );
        // set(
        //   ref(db, "devices/" + String(user?.user?.email).split("@")[0] + "3"),
        //   {
        //     current: 0,
        //     status: false,
        //     timeStamp: new Date().getTime(),
        //   }
        // );
        dismiss();
        dispatch(saveUser(user));
      })
      .catch((error) => {
        console.log(error);

        dismiss();
        present({
          message: error,
          duration: 1500,
          position: "bottom",
        });
      });
  };
  return (
    <>
      <IonGrid style={{ textAlign: "center" }}>
        <IonRow>
          <IonCol>
            <IonImg src={SaveEnergySVG} alt={"brand"}></IonImg>
            <IonText color="primary">
              <h1>Final Year Project : Signup</h1>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <form>
              <IonItem>
                <IonInput
                  placeholder="Name"
                  value={formState.name}
                  onIonChange={(e) => onInputChange("name", e)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Email"
                  value={formState.email}
                  onIonChange={(e) => onInputChange("email", e)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Password"
                  value={formState.password}
                  onIonChange={(e) => onInputChange("password", e)}
                ></IonInput>
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
