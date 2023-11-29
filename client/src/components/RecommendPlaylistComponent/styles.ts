import tw from 'twin.macro';

export const PlaylistCardContainer = tw.div`flex-col h-max relative overflow-auto bg-neutral-400 rounded-lg w-1/6  cursor-pointer`;
export const AlbumImage = tw.img`flex-col w-40 h-40 rounded-lg self-center`;
export const ContentSection = tw.div`flex-col p-4 pl-6 -ml-2`;
export const Title = tw.h3`text-lg -mt-4 text-white font-semibold`;
export const LikesText = tw.span`font-bold text-black`;
export const SocialInfo = tw.div`mt-2`;
export const ProfileSection = tw.div`flex flex-col items-start p-4`;

export const DeleteButton = tw.div`absolute top-2 right-2 cursor-pointer text-2xl text-white`;
export const ModalContainer = tw.div`flex justify-center items-center`;
export const ModalBox = tw.div`fixed top-0 left-0 w-full h-full flex justify-center 
items-center bg-black bg-opacity-50
z-40`
export const Modal = tw.div`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#bebebe] p-8 rounded shadow-md`;
export const Buttons = tw.div`flex justify-center mt-2 cursor-pointer`;
export const ConfirmButton = tw(
  Buttons,
)`mr-4 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 transition-all
duration-300
rounded-md
font-semibold hover:transform scale-105`;
export const CancelButton = tw(
  Buttons,
)`hover:bg-black hover:text-white px-4 py-2 transition-all
duration-300
rounded-md
font-semibold text-white`;
