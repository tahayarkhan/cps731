import { useState } from "react";
import OpportunityModal from "./OpportunityModal";
import noImage from "../../assets/default.png";

const OpportunityCard = ({ listing }) => {
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <div
      onClick={handleOpen}
      className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <h2 className="text-lg font-semibold text-gray-800">{listing.title}</h2>
      <div className="bg-gray-500 mb-2">
        <img
          src={listing.image ? listing.image : noImage}
          alt={listing.title}
          className="w-full h-32 object-cover mt-2"
        />
      </div>
      <p className="text-sm text-gray-600">{listing.employers_table.name}</p>
      <p className="text-sm text-gray-700 mt-2">{listing.description}</p>
      {show && (
        <OpportunityModal
          listing={listing}
          handleClose={(e) => handleClose(e)}
        />
      )}
    </div>
  );
};

export default OpportunityCard;
