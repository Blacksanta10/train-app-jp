/**
 * This is a component that serves as a button for the pop-up page
 * 
 */

"use client";

export default function MapPopupButton () {
    /**
     * Opens a separate browser window to display map page
     */
    const openMap = () => {
        window.open(
          "/map",
          "mapWindow",
          "width=500,height=600,left100,top=100,resizable=yes,scrollbars=yes"
        );
      };


    return (
        <button
        onClick={openMap}
        className="bg-accent text-black px-4 py-2 rounded"
      >
        Open Mappppp
      </button>
    );
}