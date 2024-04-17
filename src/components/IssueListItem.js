import styled from "styled-components"; // styled-components 임포트
// 타입스크립트에서 사용된 Issue 타입 임포트는 제거됨

// IssueListIssueItem 컴포넌트 정의. props는 타입 없이 바로 구조분해 할당으로 받음
const IssueListItem = ({ issue, onClickGoDetailPage }) => {
  // issue 객체에서 필요한 속성들 구조분해 할당
  const {
    number,
    user: { login },
    title,
    created_at,
    comments,
  } = issue;

  // 날짜 포매팅
  const createdAt = new Intl.DateTimeFormat().format(new Date(created_at));

  // 아이템 클릭 핸들러
  const onClickIssueItem = () => onClickGoDetailPage(issue.number);

  // 컴포넌트 반환
  return (
    <S_IssueItemContainer onClick={onClickIssueItem}>
      <S_LeftBox>
        <S_TitleItem>
          <S_IssueTitle>
            
            <S_IssueTitleText>#{number} {title}</S_IssueTitleText>
          </S_IssueTitle>
        </S_TitleItem>

        <S_IssueInfoItem>
          <S_Author>
             작성일 : {createdAt} 작성자 : {login}
          </S_Author>
        </S_IssueInfoItem>
      </S_LeftBox>

      <S_RightBox>
        <S_CommentCount>
          코멘트 : {comments}
        </S_CommentCount>
      </S_RightBox>
    </S_IssueItemContainer>
  );
};

export default IssueListItem;

// 스타일 컴포넌트 정의들

const S_IssueItemContainer = styled.li`
  display: flex;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  justify-content: center;
  max-width: 768px;
  margin: 0 auto 10px;
  cursor: pointer;
`;

const S_LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const S_TitleItem = styled.div`
  line-height: 2;
`;

// S_IssueNumber 스타일은 정의되었으나 사용되지 않음

const S_IssueTitle = styled.div`
  
`;

const S_IssueTitleText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
`;

const S_IssueInfoItem = styled.div`
  font-size: 12px;
`;

const S_Author = styled.span`
`;

const S_RightBox = styled.div``;

const S_CommentCount = styled.span`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 14px;
  text-align: top;
  gap: 10px;
`;
