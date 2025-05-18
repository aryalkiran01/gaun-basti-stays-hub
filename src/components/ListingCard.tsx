
import { Link } from "react-router-dom";
import { Listing } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link to={`/listing/${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow listing-card">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-lg">{listing.title}</h3>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium ml-1">{listing.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{listing.location}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="text-xs">
              {listing.bedrooms} {listing.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {listing.maxGuests} guests
            </Badge>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="font-semibold">
              ${listing.price} <span className="text-sm font-normal">night</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
