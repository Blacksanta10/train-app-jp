/**
 * This is the pop-up's page 
 * Only accesible from clicking pop up's button
 * 
 * This tailwind.css makes the map take up the whole window
 * It also covers the navbar and other formats from the root layout of this project (YUHHHHHH)
 */

"use client"

import { useState } from "react";
import Image from "next/image";

export default function MapPage() {

    /**
     * Tracks if the map is zoomed in or not
     * Controls the scale transform applied to the img
     */
    const [zoomed, setZoomed] = useState(false);

    return (

        /**
        *Full screen container for the map
        *Fixed the center so that map fills entire viewport
        */
        <div className="fixed inset-0 bg-black flex items-center justify-center"
            onClick={() => setZoomed(!zoomed)}
        >
        {/**
         * Element responsible for zooming
         * Apply scale transformation here instead of directly on <Image/>
         */}
            <div className={`relative transition-transform duration-300 ease-in-out ${zoomed ? "scale-150" : "scale-100"}`}
            >

                {/**
                 * The map image
                 * -select-none prevents accidental text/image selection while clicking
                 * - cursor visually tells zoom-in/zoom-out
                 * - fixed dimensions optimize img loading
                 */}
                <Image
                    src="/images/shinkansen-transit.png"
                    alt="Shinkansen transit map"
                    width={1600}
                    height={1200}
                    priority
                    className={`select-none ${ zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                />
        </div>
        </div>
    );
}