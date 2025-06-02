import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../../components/CustomDatePicker";
import {
  Container,
  HomeIcon,
  NextButton,
  Title,
} from "../chatting/SettingPage";
import { useSettingStore } from "../../services/zustand/setting";
import { useState } from "react";

const SettingWPage = () => {
  const { selectedDate, setDate } = useSettingStore();
  const navigate = useNavigate();

  type PickerValue = {
    year: string | number;
    month: string | number;
    day: string | number;
  };

  const [localDate, setLocalDate] = useState<PickerValue>({
    year: selectedDate?.getFullYear() || 2025,
    month: (selectedDate?.getMonth() || 0) + 1,
    day: selectedDate?.getDate() || 1,
  });

  const handleDateNext = () => {
    const year = Number(localDate.year);
    const month = Number(localDate.month);
    const day = Number(localDate.day);
    const fullDate = new Date(year, month - 1, day);
    setDate(fullDate);
    navigate("/writing");
  };

  const handleDateChange = (newDate: PickerValue) => {
    setLocalDate(newDate);
  };

  return (
    <Container>
      <HomeIcon onClick={() => navigate("/")}>
        <img src="/images/home.png" alt="home" width={50} />
      </HomeIcon>
      <Title>언제의 기록을 담고 싶나요?</Title>
      <CustomDatePicker value={localDate} onChange={handleDateChange} />
      <NextButton onClick={handleDateNext}>
        <img src="/images/next.png" alt="다음" />
      </NextButton>
    </Container>
  );
};

export default SettingWPage;
