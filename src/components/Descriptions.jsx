import React from "react";
import "./descriptions.css";

import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import { nanoid } from "nanoid";

export default function Descriptions({ weather, units }) {
    const tempUnit = units === "metric" ? "°C" : "°F";
    const windUnit = units === "metric" ? "m/s" : "Km/h";

    const cards = [
        {
            id: nanoid(),
            icon: <FaArrowDown />,
            title: "min",
            data: weather.temp_min.toFixed(),
            unit: tempUnit,
        },
        {
            id: nanoid(),
            icon: <FaArrowUp />,
            title: "max",
            data: weather.temp_max.toFixed(),
            unit: tempUnit,
        },
        {
            id: nanoid(),
            icon: <BiHappy />,
            title: "feels like",
            data: weather.feels_like.toFixed(),
            unit: tempUnit,
        },
        {
            id: nanoid(),
            icon: <MdCompress />,
            title: "pressure",
            data: weather.pressure,
            unit: "hPa",
        },
        {
            id: nanoid(),
            icon: <MdOutlineWaterDrop />,
            title: "humidity",
            data: weather.humidity,
            unit: "%",
        },
        {
            id: nanoid(),
            icon: <FaWind />,
            title: "wind speed",
            data: weather.speed.toFixed(),
            unit: windUnit,
        },
    ];
    return (
        <div className="section section__descriptions">
            {cards.map(({ id, icon, title, data, unit }) => (
                <div key={id} className="card">
                    <div className="description__card-icon">
                        {icon}
                        <small>{title}</small>
                    </div>
                    <h2>{`${data} ${unit}`}</h2>
                </div>
            ))}
        </div>
    );
};
