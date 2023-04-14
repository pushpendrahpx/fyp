import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonRedirect,
  IonRouterLink,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/Login.component";

import { useEffect, useState } from "react";
import Signup from "./pages/Signup/Signup.component";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import {
  firebaseAuth,
  firebaseRTDB,
  firebaseStore,
} from "./redux/firebase/firebaseSlice";
import { useDispatch } from "react-redux";
import { saveUser, signOut, updateDevices } from "./redux/user/userSlice";
import HomeIndex from "./pages/Home";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";

setupIonicReact();

const App: React.FC = () => {
  let dispatch = useDispatch();
  let state = useSelector((state: RootState) => state).userReducer;
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const [present] = useIonToast();
  let router = useIonRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    set(
      ref(
        firebaseRTDB.getDatabase(),
        "devices/" +
          String(
            state?.creds?.user ? state?.creds?.user.uid : state?.creds?.uid
          )
      ),
      state.devices
    );
  }, [state.devices]);
  useEffect(() => {
    console.log(state);

    firebaseAuth.onAuthStateChanged(firebaseAuth.getAuth(), async (user) => {
      if (user) {
        dispatch(saveUser(user));
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...

        const deviceRef = ref(
          firebaseRTDB.getDatabase(),
          "devices/" + String(user.uid)
        );
        onValue(deviceRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          dispatch(updateDevices(data));
        });
        // const usersRef = doc(firebaseStore.getFirestore(), "users", user.uid);
        // const docSnap = await getDoc(usersRef);
        // if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        //   dispatch(updateDevices(docSnap.data().devices));
        // } else {
        //   // docSnap.data() will be undefined in this case
        //   console.log("No such document!");
        // }
        router.push("/home");
        setIsLoaded(true);
      } else {
        console.log("signedout");
        // User is signed out
        // ...
        router.push("/login");

        setIsLoaded(true);
      }
    });
  }, []);
  useEffect(() => {
    console.log(isLoggedIn, state.isLoggedIn);
    setIsLoggedIn(state.isLoggedIn);
  }, [state]);
  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  console.log({ isLoggedIn });
  return (
    <IonApp>
      {isLoaded === true ? (
        <>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/home">
            {" "}
            <HomeIndex />{" "}
          </Route>
        </>
      ) : (
        <div
          style={{ height: "100vh", display: "grid", placeContent: "center" }}
        >
          <IonSpinner name="lines-sharp"></IonSpinner>
        </div>
      )}
    </IonApp>
  );
};
export default App;
