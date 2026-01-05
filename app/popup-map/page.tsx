/**
 * This is the pop-up's page 
 * Only accesible from clicking pop up's button
 * 
 * This tailwind.css makes the map take up the whole window
 * It also covers the navbar and other formats from the root layout of this project (YUHHHHHH)
 */
import Image from "next/image";

export default function MapPage() {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            <Image
                src="/images/shinkansen-transit.png"
                alt="Shinkansen transit map"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}