import React from "react"
import { AddDestinationForm } from "@/components/destination/add-destination-form"

const AddDestination = () => {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-medium sm:text-5xl">
          Add New Travel Package
        </h1>
        <AddDestinationForm />
      </div>
    </main>
  );
};

export default AddDestination;
