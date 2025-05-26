import styled from 'styled-components';
import { IoHomeOutline } from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const DiaryDetail = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <HomeIcon onClick={() => navigate('/')} />
        <DateText>2025.05.01.</DateText>
        <EditIcon />
      </Header>

      <Body>
        <Title>오늘은 영화 보러 간 날</Title>
        <TagBox>
          <Tag>#취미</Tag>
          <Tag>#휴식</Tag>
        </TagBox>

        <Content>
          오늘은 오랜만에 영화관에 가서 영화를 보고 왔다. 요즘 바빠서 제대로 쉬지도 못했는데, 이렇게 여유롭게 시간을 보내니 기분이 참 좋았다. 친구와 약속을 잡고 미리 예매까지 해두었는데, 다행히 좋은 자리에서 관람할 수 있었다. <br /><br />
          보고 싶었던 영화라 기대가 컸는데, 그 기대를 저버리지 않고 정말 재미있었다. 배우들의 연기도 훌륭했고, 스토리도 탄탄해서 중간에 지루할 틈이 없었다. 영화관 특유의 분위기, 어두운 조명과 커다란 스크린, 웅장한 사운드까지 모든 게 몰입감을 더해줬다. <br /><br />
          팝콘과 콜라도 빠질 수 없어서, 먹으면서 영화 보는 재미도 쏠쏠했다. 엔딩 크레딧이 올라갈 때는 아쉬운 마음도 들었지만, 오랜만에 힐링되는 시간을 보낸 것 같아 만족스럽다. 다음엔 다른 장르의 영화도 보러 가고 싶다.
        </Content>

        <CommentTitle>AI 친구의 코멘트</CommentTitle>
        <CommentCard>
          <CharacterRow>
            <CharacterImg src="/ai_character.png" alt="웅이" />
            <CharacterName>웅이</CharacterName>
          </CharacterRow>
          <CommentText>
            오랜만에 영화관에서 좋은 시간 보냈다니 내가 다 기쁘다! 너의 여유로운 하루가 참 따뜻하게 느껴져 :)
          </CommentText>
        </CommentCard>
      </Body>
    </Container>
  );
};

export default DiaryDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  background: #fef2f2;
  padding: 12px 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  text-align: center;
`;

const DateText = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1e2a52;
  margin: 0;
`;

const HomeIcon = styled(IoHomeOutline)`
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #1e2a52;
`;

const EditIcon = styled(BsPencil)`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #1e2a52;
`;

const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  border-radius: 8px;
`;

const TagBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #ffffff;
  color: #2563eb;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 0 1px #cbd5e1;
`;

const Content = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #374151;
  white-space: pre-line;
`;

const CommentTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e2a52;
`;

const CommentCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const CharacterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const CharacterImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CharacterName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e2a52;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
`;
