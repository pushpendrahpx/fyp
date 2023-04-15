import {
  IonApp,
  IonCard,
  IonChip,
  IonContent,
  IonHeader,
  IonImg,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import ImgAsset from "./../../../assets/img.jpeg";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

let Usage = () => {
  const devices = useSelector((state: RootState) => state.userReducer.devices);
  const [deviceState, setDeviceState] = useState<Array<Number>>([]);
  const [deviceState1, setDeviceState1] = useState<Array<Number>>([]);
  const [graphState, setGraphState] = useState({
    chart: {
      type: "spline",
      spacingRight: 2,
    },
    title: {
      text: "Device 0",
    },
    yAxis: {
      title: null,
    },
    series: [
      {
        data: [1, 2, 3],
        x: [1, 2, 3],
      },
    ],
    xAxis: {
      type: "datetime",
    },
    time: {
      useUTC: false,
      timezone: "Asia/Calcutta",
    },
  });
  const [graphState1, setGraphState1] = useState({
    chart: {
      type: "spline",
    },
    title: {
      text: "Device 1",
    },
    yAxis: {
      title: null,
    },
    series: [
      {
        data: [1, 2, 3],
        x: [1, 2, 3],
      },
    ],
    xAxis: {
      type: "datetime",
    },
    time: {
      useUTC: false,
      timezone: "Asia/Calcutta",
    },
  });
  useEffect(() => {
    if (devices[0]?.data && devices[1]?.data) {
      let allValues: Array<any> = Object.values(devices[0].data);
      let allValues1: Array<any> = Object.values(devices[1].data);
      allValues = allValues.map((eachValue: any, eachIndex) => {
        return { ts: eachValue.Ts, value: Number(eachValue.value) };
      });

      allValues1 = allValues1.map((eachValue: any, eachIndex) => {
        return { ts: eachValue.Ts, value: Number(eachValue.value) };
      });
      setDeviceState(allValues);
      setDeviceState1(allValues1);
    }
    // console.log(
    //   deviceState,
    //   devices,
    //   devices[0]?.data &&
    //     Array.isArray(devices[0].data) &&
    //     devices[0]?.data?.map((eachDevice: any) => {
    //       return eachDevice.value;
    //     })
    // );
    // setDeviceState(

    // );
  }, [devices]);

  useEffect(() => {
    setGraphState((prev: any) => {
      return {
        ...prev,
        series: [
          {
            data: deviceState?.map((each: any) => {
              return [each.ts, each.value];
            }),
          },
        ],
      };
    });
  }, [deviceState]);

  useEffect(() => {
    setGraphState1((prev: any) => {
      return {
        ...prev,
        series: [
          {
            data: deviceState1?.map((each: any) => {
              return [each.ts, each.value];
            }),
          },
        ],
      };
    });
  }, [deviceState1]);
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ textAlign: "center" }}>
        <div>
          <HighchartsReact highcharts={Highcharts} options={graphState} />
        </div>

        <div>
          <HighchartsReact highcharts={Highcharts} options={graphState1} />
        </div>
        {/* <IonImg src={ImgAsset} alt={"img"}></IonImg> */}
        <IonTitle>
          <IonChip>Your Energy Consumption will be shown here</IonChip>
        </IonTitle>
      </IonContent>
    </IonApp>
  );
};
export default Usage;
