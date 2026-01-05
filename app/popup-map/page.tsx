/**
 * This is the pop-up's page 
 * Only accesible from clicking pop up's button
 */
import Image from "next/image";

export default function MapPage() {
    return (
        <div className="w-full h-screen">
            <Image
                src="/images/shinkansen-transit.png"
                alt="Shinkansen transit map"
                fill
                className="w-full h-full object-contain"
                priority
            />
        </div>
    );
}