/**
 * The 2nd page of the web application
 * 
 * Not sure what's going here yet?
 */

"use client";
import Image from "next/image";
//import { useEffect, useState } from "react";

export default function HomePage() {
    return ( 
        <div className="p-8">
            <Image
            src="/images/shinkansen-transit.png"
            alt="Train map image"
            width={800}
            height={500}
            className="rounded-lg object-fill"
            />
        </div>
    );
}