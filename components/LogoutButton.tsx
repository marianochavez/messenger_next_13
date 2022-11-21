"use client";

const LogoutButton = () => {
  return (
    <button
      // todo: logout session
      onClick={() => console.log("hi")}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
