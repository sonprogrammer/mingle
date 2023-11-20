import React, { useState } from "react";
import { RecommendGenreComponent } from "../../components/RecommendGenreComponent";

export default function RecommendGenrePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <RecommendGenreComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
