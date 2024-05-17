import React from "react";

import sunIcon from "../../img/icons/sun.png";
import cloudSunIcon from "../../img/icons/cloud-sun.png";
import cloudIcon from "../../img/icons/cloud.png";
import smogIcon from "../../img/icons/smog.png";
import cloudShowersHeavyIcon from "../../img/icons/cloud-showers-heavy.png";
import snowflakeIcon from "../../img/icons/snowflake.png";
import cloudBoltIcon from "../../img/icons/cloud-bolt.png";

export const ICON_MAP = new Map();

addMapping([0, 1], sunIcon);
addMapping([2], cloudSunIcon);
addMapping([3], cloudIcon);
addMapping([45, 48], smogIcon);
addMapping(
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    cloudShowersHeavyIcon
);
addMapping([71, 73, 75, 77, 85, 86], snowflakeIcon);
addMapping([95, 96, 99], cloudBoltIcon);

function addMapping(values, icon) {
    values.forEach(value => {
        ICON_MAP.set(value, icon);
    });
}

export default function WeatherDay({ day, temp, icon }) {
    const iconSrc = ICON_MAP.get(icon);
    return (
        <div className="weather-day">
            <span>{day}</span>
            <div><img src={iconSrc} /><span>{temp + "°C"}</span></div>
        </div>
    );
}
