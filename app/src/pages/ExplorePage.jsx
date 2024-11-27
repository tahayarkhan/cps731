import { useState, useEffect } from "react";
import { useAuth } from "../authCrap/AuthProvider";
import Filters from "../components/explore/Filters";
import Listings from "../components/explore/Listings";
import SearchBar from "../components/explore/SearchBar";
import Toggle from "../components/explore/Toggle";
import { getRankedOpportunities, getOpportunities } from "../services/api";

const ExplorePage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({});

  //Real
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        let response;
        if (user && user.type === "volunteer") {
          response = await getRankedOpportunities();
        } else {
          response = await getOpportunities();
        }
        setListings(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOpportunities();
  }, [filters]);

  return (
    <div className="flex h-full w-full">
      <div className="w-1/4 h-full p-4">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <div className="w-full p-4">
        <div className="flex gap-6">
          <SearchBar setFilters={setFilters} />
          {user && user.type === "volunteer" && (
            <Toggle setListings={setListings} />
          )}
        </div>
        <Listings listings={listings} />
      </div>
    </div>
  );
};

export default ExplorePage;
