import { useState } from "react";
import { enhanceApplication, applyForOpportunity } from "../../services/api";
import ai from "../../assets/ai.png";

const OpportunityApplication = ({ listing, handleBack, handleClose }) => {
  const [applicationText, setApplicationText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyForOpportunity({
        opportunity: listing.id,
        text: applicationText,
      });
      alert("Application submitted!");
      handleClose(e);
    } catch (error) {
      console.error("Failed to submit application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  const handleEnhance = async () => {
    try {
      const res = await enhanceApplication(applicationText);
      setApplicationText(res.data);
    } catch (error) {
      console.error("Failed to enhance application:", error);
      alert("Failed to enhance application. Please try again.");
    }
  };

  return (
    <div>
      <div className="relative">
        <textarea
          value={applicationText}
          onChange={(e) => setApplicationText(e.target.value)}
          placeholder="Type your application here..."
          className="w-full p-2 border rounded resize-none"
          rows="10"
        />
        <div
          onClick={handleEnhance}
          className="absolute bottom-1 right-1 w-8 h-8 m-2 rounded-full hover:bg-gray-200 flex justify-center items-center"
        >
          <img src={ai} alt="AI" className="w-6 h-6" />
        </div>
      </div>

      <div className="flex justify-center gap-5 mt-4">
        <button
          onClick={handleBack}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OpportunityApplication;
