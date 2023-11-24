import React, { Dispatch, useState } from 'react';
import {
  StyledNextButton,
  StyledNumbers,
  StyledPreviousButton,
} from './styles';

interface PaginationComponentProps {
  setPageNum: Dispatch<React.SetStateAction<number>>;
  currentPage?: number;
  totalPages?: number;
}
export default function PaginationComponent({
  setPageNum,
  currentPage,
  totalPages,
}: PaginationComponentProps) {
  const pageLength = totalPages && totalPages <= 5 ? totalPages : 5;
  const generateConsecutiveNumbers = (start: number, length: number) => {
    if (totalPages && totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    return Array.from({ length }, (_, index) => start + index);
  };
  const [pageNumbers, setPageNumbers] = useState(
    generateConsecutiveNumbers(1, pageLength),
  );

  const handleNext = (currentPage: number) => {
    setPageNum(currentPage + 1);
    if (currentPage % pageLength === 0) {
      const newStart = currentPage + 1;
      if (totalPages && newStart + pageLength > totalPages) {
        setPageNumbers(
          generateConsecutiveNumbers(newStart, totalPages - newStart + 1),
        );
      } else {
        setPageNumbers(generateConsecutiveNumbers(newStart, pageLength));
      }
    }
  };
  const handlePrevious = (currentPage: number) => {
    setPageNum(currentPage - 1);
    const newStart = Math.max(1, currentPage - pageLength);
    if ((currentPage - 1) % pageLength === 0) {
      setPageNumbers(generateConsecutiveNumbers(newStart, pageLength));
    }
  };
  return (
    <>
      {currentPage && totalPages && (
        <ul className="flex items-center -space-x-px h-8 text-sm justify-center">
          <li>
            <StyledPreviousButton
              onClick={() => currentPage > 1 && handlePrevious(currentPage)}
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </StyledPreviousButton>
          </li>
          {pageNumbers.map((item, idx) => {
            return (
              <StyledNumbers
                isSelected={item === currentPage}
                onClick={() => {
                  setPageNum(item);
                }}
                key={idx}
              >
                {item}
              </StyledNumbers>
            );
          })}
          <li>
            <StyledNextButton
              onClick={() =>
                currentPage < totalPages && handleNext(currentPage)
              }
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </StyledNextButton>
          </li>
        </ul>
      )}
    </>
  );
}
