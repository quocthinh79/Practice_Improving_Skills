import axios from "axios";
import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { weatherDataFeed } from "~/service/weatherDataFeed";
import styles from "./Weather.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function WeartherDataFeedPage() {
  const [weatherData, setWeatherData] = useState([]);
  const CITY_NUMBER = 59;
  const weatherBigData = { data: [] };
  function createArrayBigData(arrayNumber, array) {
    for (let i = 0; i <= arrayNumber; i++) {
      array.push({
        city: "",
        currentTemp: "",
        currentDescription: "",
        today: "",
        tempToday: "",
        desciptionToday: "",
        tomorrow: "",
        tempTomorrow: "",
        desciptionTomorrow: "",
        afterTomorrow: "",
        tempAfterTomorrow: "",
        desciptionAfterTomorrow: "",
        updateDay: "",
      });
    }
  }
  createArrayBigData(CITY_NUMBER, weatherBigData.data);

  let today = "";
  let tomorrow = "";
  let afterTomorrow = "";

  function weatherDateInHeader(elementNumber, regex) {
    let selector = `table.tabTop td.col${elementNumber} span.dbttDate`;
    let date = regex(selector).text().trim();
    switch (elementNumber) {
      case 3:
        today = date;
        pushAttributeToObjectInArray("today", date);
        break;
      case 4:
        tomorrow = date;
        pushAttributeToObjectInArray("tomorrow", date);
        break;
      case 5:
        afterTomorrow = date;
        pushAttributeToObjectInArray("afterTomorrow", date);
        break;
    }
  }

  function weatherTemplateInHeader(elementNumber, regex) {
    let selector = `table.tabTop td.col${elementNumber} span.ndSmall`;
    let result = "";
    if (regex(selector).html() !== null) {
      result = regex(selector).html().replaceAll("<sup>o</sup>", " độ "); // Nhiệt độ giao động
    } else {
      result = "Đang cập nhật";
    }
    switch (elementNumber) {
      case 3:
        pushAttributeToObjectInArray("tempToday", result);
        pushAttributeToObjectInArray("desciptionToday", "Đang cập nhật");
        break;
      case 4:
        pushAttributeToObjectInArray("tempTomorrow", result);
        pushAttributeToObjectInArray("desciptionTomorrow", "Đang cập nhật");
        break;
      case 5:
        pushAttributeToObjectInArray("tempAfterTomorrow", result);
        pushAttributeToObjectInArray(
          "desciptionAfterTomorrow",
          "Đang cập nhật"
        );
        break;
    }
  }

  function weatherAnotherCity(regex, className) {
    let element = regex(`tbody.tabBttBody ${className}`);
    const result = [];
    element.each(function () {
      let textInHtml = regex(this)
        .text()
        .replaceAll(/[\n\r\s\t]+/g, " ")
        .trim()
        .replaceAll("oC", " độ C");
      result.push(textInHtml);
    });
    return result;
  }

  function sliceDesciptionTempNow(array, updateDay) {
    array.forEach((element, index) => {
      pushAttributeToObjectInArray("updateDay", updateDay);
      if (element !== "Đang cập nhật") {
        let posSlice = element.lastIndexOf("độ C") + 5;
        pushAttributeToObjectInArray("currentTemp", element.slice(0, posSlice));
        pushAttributeToObjectInArray(
          "currentDescription",
          element.slice(posSlice, element.length)
        );
      } else {
        pushAttributeToObjectInArray("currentTemp", element);
        pushAttributeToObjectInArray("currentDescription", element);
      }
    });
  }

  function sliceDesciptionTempAnotherDay(array, updateDay) {
    array.forEach((element, index) => {
      let posSlice = element.lastIndexOf("độ C") + 5;
      let temp = element.slice(0, posSlice);
      let desciption = element.slice(posSlice, element.length);
      pushAttributeToObjectInArray("updateDay", updateDay);
      if (index % 3 === 0) {
        if (element !== "Đang cập nhật") {
          pushAttributeToObjectInArray("today", today);
          pushAttributeToObjectInArray("tempToday", temp);
          pushAttributeToObjectInArray("desciptionToday", desciption);
        } else {
          pushAttributeToObjectInArray("today", today);
          pushAttributeToObjectInArray("tempToday", element);
          pushAttributeToObjectInArray("desciptionToday", element);
        }
      } else if (index % 3 === 1) {
        if (element !== "Đang cập nhật") {
          pushAttributeToObjectInArray("tomorrow", tomorrow);
          pushAttributeToObjectInArray("tempTomorrow", temp);
          pushAttributeToObjectInArray("desciptionTomorrow", desciption);
        } else {
          pushAttributeToObjectInArray("tomorrow", tomorrow);
          pushAttributeToObjectInArray("tempTomorrow", element);
          pushAttributeToObjectInArray("desciptionTomorrow", element);
        }
      } else {
        if (index <= 2) {
          switch (index) {
            case 0:
              if (element !== "Đang cập nhật") {
                pushAttributeToObjectInArray("today", "Đang cập nhật");
                pushAttributeToObjectInArray("tempToday", temp);
                pushAttributeToObjectInArray("desciptionToday", desciption);
              } else {
                pushAttributeToObjectInArray("today", "Đang cập nhật");
                pushAttributeToObjectInArray("tempToday", element);
                pushAttributeToObjectInArray("desciptionToday", element);
              }
              break;
            case 1:
              if (element !== "Đang cập nhật") {
                pushAttributeToObjectInArray("tomorrow", tomorrow);
                pushAttributeToObjectInArray("tempTomorrow", temp);
                pushAttributeToObjectInArray("desciptionTomorrow", desciption);
              } else {
                pushAttributeToObjectInArray("tomorrow", tomorrow);
                pushAttributeToObjectInArray("tempTomorrow", element);
                pushAttributeToObjectInArray("desciptionTomorrow", element);
              }
              break;
            case 2:
              if (element !== "Đang cập nhật") {
                pushAttributeToObjectInArray("afterTomorrow", afterTomorrow);
                pushAttributeToObjectInArray("tempAfterTomorrow", temp);
                pushAttributeToObjectInArray(
                  "desciptionAfterTomorrow",
                  desciption
                );
              } else {
                pushAttributeToObjectInArray("afterTomorrow", afterTomorrow);
                pushAttributeToObjectInArray("tempAfterTomorrow", element);
                pushAttributeToObjectInArray(
                  "desciptionAfterTomorrow",
                  element
                );
              }
              break;
          }
        } else {
          if (element !== "Đang cập nhật") {
            pushAttributeToObjectInArray("afterTomorrow", afterTomorrow);
            pushAttributeToObjectInArray("tempAfterTomorrow", temp);
            pushAttributeToObjectInArray("desciptionAfterTomorrow", desciption);
          } else {
            pushAttributeToObjectInArray("afterTomorrow", afterTomorrow);
            pushAttributeToObjectInArray("tempAfterTomorrow", element);
            pushAttributeToObjectInArray("desciptionAfterTomorrow", element);
          }
        }
      }
    });
  }

  var BreakException = {}; // Break forEach

  function pushAttributeToObjectInArray(attribute, value) {
    try {
      weatherBigData.data.forEach((element, index) => {
        if (
          element[attribute] === null ||
          element[attribute] === undefined ||
          element[attribute] === ""
        ) {
          element[attribute] = value;
          throw BreakException; // Break forEach
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e; // Break forEach
    }
  }

  const [timeToUpdate, setTimeToUpdate] = useState();
  const [hourUpdate, setHourUpdate] = useState();

  const timeNow = new Date();
  let hour = timeNow.getHours();
  let minute = timeNow.getMinutes();
  let second = timeNow.getSeconds();
  const firstUpdate = useRef(true);

  const futureUpdate = new Date().setHours(hour + 1, 0, 0);

  const minuteRemaining = Math.ceil((futureUpdate - timeNow) / 1000 / 60);

  const hourRemaining = Math.floor((futureUpdate - timeNow) / 1000 / 60 / 60);

  const [secondTimeRemain, setSecondTimeRemain] = useState();

  let totalSecondRemain = 0;

  useEffect(() => {
    setTimeout(
      () =>
        setSecondTimeRemain(
          Math.round((((futureUpdate - timeNow) / 1000) % 60) - 1) >= 0
            ? Math.round((((futureUpdate - timeNow) / 1000) % 60) - 1)
            : 59
        ),
      1000
    );
    totalSecondRemain =
      (hourRemaining * 60 + minuteRemaining) * 60 + secondTimeRemain - 1;
    if (hourRemaining === 0 && minuteRemaining === 1 && secondTimeRemain <= 1) {
      console.log("Tổng giây còn lại: ", totalSecondRemain);
      console.log("Giờ hiện tại: ", new Date().getHours());
      setHourUpdate(new Date().getHours() + 1);
      console.log("Hour update: " + hourUpdate);
    }
  }, [secondTimeRemain]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const getDataInHtml = async () => {
      const result = await weatherDataFeed();
      const cheerio = require("cheerio");
      const $ = cheerio.load(result);
      // Phần dự báo header
      pushAttributeToObjectInArray("city", $("span.addName").text()); // Tên thành phố ở phần header
      let updateDay = $("div.mgT25 strong").text();
      pushAttributeToObjectInArray("updateDay", updateDay); // Thời gian cập nhật
      if ($("table.tabTop span.ndBig").html() !== null) {
        pushAttributeToObjectInArray(
          "currentTemp",
          $("table.tabTop span.ndBig").html().replace("<sup>o</sup>", " độ ")
        );
        pushAttributeToObjectInArray(
          "currentDescription",
          $("table.tabTop span.hTuong").text()
        );
      } else {
        pushAttributeToObjectInArray("currentTemp", $("td.col1").text());
        pushAttributeToObjectInArray("currentDescription", $("td.col1").text());
      }

      // Thời tiết hôm nay, ngày mai và ngày kia trên header
      for (let i = 3; i <= 5; i++) {
        weatherDateInHeader(i, $); // Ngày
        weatherTemplateInHeader(i, $); // Nhiệt độ giao động
      }

      // Tên các thành phố khác
      $("tbody.tabBttBody td.add").each(function (index) {
        pushAttributeToObjectInArray("city", $(this).text()); // Tên thành phố ở phần item
      });

      // Mô tả thời tiết hiện tại của các thành phố khác
      let weatherNow = weatherAnotherCity($, ".bgColor");
      sliceDesciptionTempNow(weatherNow, updateDay);

      // Mô tả thời tiết các ngày còn lại của các thành phố khác
      let weatherAnotherDay = weatherAnotherCity($, ".cont");
      sliceDesciptionTempAnotherDay(weatherAnotherDay, updateDay);
      const myObjStr = JSON.stringify(weatherBigData.data);
      fetch(
        "https://sheet.best/api/sheets/0e54b5be-0536-4f0c-b039-31dff3d6cb47",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: myObjStr,
        }
      )
        .then((r) => r.json())
        .then((data) => {
          // The response comes here
          setTimeToUpdate(new Date().toLocaleString());
        })
        .catch((error) => {
          // Errors are reported there
          console.log(error);
        });
      console.log("Fetch API");
    };
    getDataInHtml();
    setWeatherData(weatherBigData);
  }, [hourUpdate]);

  return (
    <>
      <h1>Last update: {timeToUpdate ? timeToUpdate : "About an hour ago"}</h1>
      <h2>
        Current time: {hour} : {minute} : {second}
      </h2>
      <h3>
        Data will be updated in{" "}
        <span className={cx("remain-time")}>
          {hourRemaining} : {minuteRemaining} : {secondTimeRemain}
        </span>
      </h3>
    </>
  );
}

export default WeartherDataFeedPage;
