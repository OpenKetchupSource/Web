import styled from 'styled-components';

const diaries = [
  {
    date: '2025.05.01.',
    title: '오늘은 영화 보러 간 날',
    tags: ['#취미', '#휴식'],
    content: '재밌었다!'.repeat(30),
  },
  {
    date: '2025.05.01.',
    title: '오늘은 영화 보러 간 날',
    tags: ['#취미', '#휴식'],
    content: '재밌었다!'.repeat(30),
  },
  {
    date: '2025.05.01.',
    title: '오늘은 영화 보러 간 날',
    tags: ['#취미', '#휴식'],
    content: '재밌었다!'.repeat(30),
  },
  {
    date: '2025.05.01.',
    title: '오늘은 영화 보러 간 날',
    tags: ['#취미', '#휴식'],
    content: '재밌었다!'.repeat(30),
  },
  {
    date: '2025.05.01.',
    title: '오늘은 영화 보러 간 날',
    tags: ['#취미', '#휴식'],
    content: '재밌었다!'.repeat(30),
  },
];

const DiaryList = () => {
  return (
    <Wrapper>
      
      <CardList>
        {diaries.map((diary, index) => (
          <Card key={index}>
            <DateText>{diary.date}</DateText>
            <DiaryTitle>{diary.title}</DiaryTitle>
            <TagWrapper>
              {diary.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </TagWrapper>
            <Content>{diary.content}</Content>
          </Card>
        ))}
      </CardList>
    </Wrapper>
  );
};

export default DiaryList;

export const Wrapper = styled.div`
  padding: 0 24px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const CardList = styled.div`
  flex: 1; /* 남는 공간 모두 사용 */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow: hidden;
`;

export const DateText = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

export const DiaryTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 4px 0;
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: #3b82f6;
  margin-bottom: 8px;
`;

export const Tag = styled.span``;

export const Content = styled.div`
  font-size: 14px;
  color: #4b5563;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 3줄 말줄임 */
  -webkit-box-orient: vertical;
`;
