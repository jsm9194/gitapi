import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../assets/Loading.gif"; 
import { AssignmentContext } from "../network/CallAPI";
import {marked} from "marked"; 
import DOMPurify from "dompurify";


const IssueDetailPage = () => {
  const { number } = useParams(); 

  
  const { getIssueDetail, issueDetail, isLoading, setHeader, isError } =
    useContext(AssignmentContext);

  const { user, title, created_at, comments, body, repository_url } =
    issueDetail || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const headerTitle = repository_url
    ?.split("https://api.github.com/repos/")
    .join("");

  useEffect(() => {
    if (headerTitle) {
      setHeader(headerTitle);
    }
  }, [setHeader, headerTitle]);


  useEffect(() => {
    if (number) {
      getIssueDetail(number);
    }
  }, [getIssueDetail, number]);

  const createMarkup = (markdown) => {
    // markdown 값이 유효한지 확인
    if (!markdown) {
      return { __html: '' };
    }
    const rawMarkup = marked(markdown);
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanMarkup };
  };


  if (isError) {
    return <div>에러에러 삐융빼융</div>;
  }

  return (
    <>
      {isLoading ? (
        <S_LoadingContainer>
          <S_LoadingImage src={Loading} />
        </S_LoadingContainer>
      ) : (
        <S_Container>
          <S_Wrapper>
            <S_Avatar src={user?.avatar_url} alt="avatar" />
            <div>
              <S_Title>
                #{number} {title}
              </S_Title>
              <S_Describe>
                작성자: {user?.login}, 작성일:{" "}
                {new Date(created_at || "").getFullYear()}년{" "}
                {new Date(created_at || "").getMonth() + 1}월{" "}
                {new Date(created_at || "").getDate()}일
              </S_Describe>
            </div>
            <S_Comment>코멘트: {comments}</S_Comment>
          </S_Wrapper>
          <div dangerouslySetInnerHTML={createMarkup(body)}></div>
        </S_Container>
      )}
    </>
  );
};

export default IssueDetailPage;


const S_LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const S_LoadingImage = styled.img`
  width: 20rem;
  height: 20rem;
`;

const S_Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 0 15px;
  min-height: 100vh;
  img {
    max-width: 100%;
  }
`;

const S_Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const S_Avatar = styled.img`
  width: 50px;
  margin-right: 10px;
`;

const S_Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const S_Describe = styled.div`
  font-size: 12px;
`;

const S_Comment = styled.div`
  text-align: right;
  font-size: 12px;
  width: 70px;
  flex-shrink: 0;
`;