import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AssignmentContext } from "../network/CallAPI";
import IssueListItem from "../components/IssueListItem";
import LogoImg from "../assets/LogoImg.jpg";
import Loading from "../assets/Loading.gif";
import styled from "styled-components";

const IssueListPage = () => {
    const navigate = useNavigate(); 

    const {
      isLoading,
      issueList,
      setHeader,
      isNoMore,
      isError,
      getNextPageList,
    } = useContext(AssignmentContext); 

    const headerTitle = issueList[0]?.repository_url
      ?.split("https://api.github.com/repos/")
      .join("");
  
    useEffect(() => {
      if (headerTitle) {
        setHeader(headerTitle);
      }
    }, [setHeader, headerTitle]);
  
    const onClickGoDetailPage = (issueNumber) => {
      navigate(`/issue-detail/${issueNumber}`);
    };
  
    const bottomLoader = useRef(null);
    const handleObserver = useCallback(
      (entries, observer) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
          observer.unobserve(bottomLoader.current);
          if (isNoMore) {
            observer.disconnect();
            return;
          }
          getNextPageList();
        }
      },
      [isLoading, isNoMore, getNextPageList]
    );
  
    
    useEffect(() => {
      const option = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(handleObserver, option);
      if (bottomLoader.current) {
        observer.observe(bottomLoader.current);
      }
      return () => {
        observer && observer.disconnect();
      };
    }, [handleObserver]);
  
   
    if (isError) {
      return <div>에러에러 삐융빼융</div>;
    }
  
   
    return (
      <>
        <div>
          {issueList.map((issue, index) => {
            return (
              <Fragment key={issue.number}>
                {index === 4 && (
                  <a href="https://www.wanted.co.kr/">
                    <S_AdImg>
                      <img src={LogoImg} alt="ad" />
                    </S_AdImg>
                  </a>
                )}
               <IssueListItem
                issue={issue}
                onClickGoDetailPage={onClickGoDetailPage}
                />
              </Fragment>
            );
          })}
        </div>
        <S_InfiniteScroll ref={bottomLoader}>
          {isLoading && <S_LoadingImg src={Loading} alt="로딩"/>}
        </S_InfiniteScroll>
      </>
    );
  };
  
  export default IssueListPage;

  const S_AdImg = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 10px;
  img {
    height: 100%;
    width: 30rem;
  }
`;

const S_InfiniteScroll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const S_LoadingImg = styled.img`
  height: 100%;
`;