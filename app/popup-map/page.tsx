/**
 * This is the pop-up's page 
 * Only accesible from clicking pop up's button
 */

export default function MapPage() {
    return (
        <div className="w-full h-screen">
            <iframe 
            src="/images/shinkansen-transit.png"
            className="w-full h-full border-0"
            />
        </div>
    );
}