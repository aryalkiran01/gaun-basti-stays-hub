
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyListings } from "@/lib/dummy-data";
import ListingCard from "@/components/ListingCard";
import SearchForm from "@/components/SearchForm";

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [filteredListings, setFilteredListings] = useState(dummyListings);
  
  const locationParam = searchParams.get("location");
  const dateParam = searchParams.get("date");
  const guestsParam = searchParams.get("guests");

  // Filter listings based on search params
  useEffect(() => {
    let filtered = [...dummyListings];
    
    if (locationParam) {
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    
    if (guestsParam) {
      const guests = parseInt(guestsParam);
      if (!isNaN(guests)) {
        filtered = filtered.filter(listing => listing.maxGuests >= guests);
      }
    }
    
    // Note: In a real app, we'd also filter by date availability
    
    setFilteredListings(filtered);
  }, [locationParam, dateParam, guestsParam]);

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <section className="bg-gaun-cream py-8">
        <div className="container">
          <h1 className="text-3xl font-serif font-bold mb-6">Find your perfect stay</h1>
          <SearchForm />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-semibold">
              {filteredListings.length} {filteredListings.length === 1 ? 'stay' : 'stays'} available
            </h2>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No listings found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or explore other locations.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Listings;
