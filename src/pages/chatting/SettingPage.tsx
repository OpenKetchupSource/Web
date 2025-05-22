import React from "react";
import { useSettingStore } from "../../services/zustand/setting";

const characters = [
  {
    id: "angry",
    name: "앙글이",
    description:
      "화가 나지만, 상황에서 속이 뻥 뚫리게 같이 화를 내줄 수 있어요!",
  },
  {
    id: "happy",
    name: "웅이",
    description: "항상 즐겁고 기분을 북돋아주는 친구예요.",
  },
  {
    id: "calm",
    name: "티바노",
    description: "차분하게 상황을 바라볼 수 있도록 도와줘요.",
  },
];

const SettingPage: React.FC = () => {
  const { selectedDate, setDate, selectedCharacter, setCharacter } =
    useSettingStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">언제의 기록을 담고 싶나요?</h1>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
        className="mb-6 p-2 border rounded"
      />

      <h2 className="text-xl font-bold mb-4">누구와 대화하고 싶나요?</h2>
      <div className="flex gap-4 mb-4">
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => setCharacter(char.id)}
            className={`cursor-pointer p-2 border rounded ${
              selectedCharacter === char.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <div className="text-center">{char.name}</div>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold">
            {characters.find((c) => c.id === selectedCharacter)?.name}
          </h3>
          <p>
            {characters.find((c) => c.id === selectedCharacter)?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingPage;
