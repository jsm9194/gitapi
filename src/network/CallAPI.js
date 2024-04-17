import axios from "axios";
import { useState, createContext, useCallback } from "react";

const axiosInstance = axios.create({
    baseURL: "https://api.github.com/repos/angular/angular-cli/",
    
  });

export const AssignmentContext = createContext({
    isLoading: false,
    getListByPageNumber: (pageNumber) => Promise.resolve(),
    getNextPageList: ()=> {},
    issueList: [],
    getIssueDetail: (issueNum) => {},
    issueDetail: undefined,
    pageNum: 0,
    headerTitel:"",
    setHeader:(headerText)=>{},
    isNoMoreL: false,
    isError: false,
});

const ContextProvider = ({ children }) => { 
    const [pageNum, setPageNum] = useState(0); 
    const [isLoading, setIsLoading] = useState(false); 
    const [issueList, setIssueList] = useState([]); 
    const [issueDetail, setIssueDetail] = useState(); 
    const [headerTitle, setHeaderTitle] = useState(""); 
    const [isNoMore, setIsNoMore] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const getIssueDetail = useCallback(async (issueNumber) => { // 선택된 이슈의 상세 정보를 불러오는 함수입니다.
      try {
        setIsLoading(true); // 로딩 상태를 true로 설정합니다.
        const response = await axiosInstance.get(`issues/${issueNumber}`); // axiosInstance를 사용하여 요청을 보냅니다.
        setIssueDetail(response.data); // 요청 결과로 이슈 상세 정보를 설정합니다.
      } catch (e) {
        console.error(e); // 에러가 발생하면 콘솔에 에러를 출력합니다.
        setIsError(true); // 에러 상태를 true로 설정합니다.
      } finally {
        setIsLoading(false); // 로딩 상태를 false로 설정합니다.
      }
    }, []);
  
    const getNextPageList = () => { // 다음 페이지의 이슈 목록을 불러오는 함수입니다.
      if (!isNoMore) { // 더 이상 불러올 페이지가 없는 경우가 아니라면,
        getListByPageNumber(pageNum + 1); // 다음 페이지 번호로 이슈 목록을 불러옵니다.
        setPageNum(pageNum + 1); // 페이지 번호를 업데이트합니다.
      }
    };
  
    const getListByPageNumber = useCallback(async (pageNumber) => { // 특정 페이지 번호의 이슈 목록을 불러오는 함수입니다.
      try {
        setIsLoading(true); // 로딩 상태를 true로 설정합니다.
        const response = await axiosInstance.get(`issues?sort=comments&page=${pageNumber}`); // axiosInstance를 사용하여 요청을 보냅니다.
        if (response.data.length === 0) {
          setIsNoMore(true); // 받아온 데이터가 없으면, 더 이상 불러올 페이지가 없음을 나타냅니다.
        }
        setIssueList((prev) => [...prev, ...response.data]); // 이전 목록에 새로운 데이터를 추가합니다.
      } catch (e) {
        console.error(e); // 에러가 발생하면 콘솔에 에러를 출력합니다.
        setIsError(true); // 에러 상태를 true로 설정합니다.
      } finally {
        setIsLoading(false); // 로딩 상태를 false로 설정합니다.
      }
    }, []);
  
    const setHeader = (headerText) => { // 헤더 제목을 설정하는 함수입니다.
      setHeaderTitle(headerText);
    };
  
    const value = { // Context에 전달할 값들을 객체로 구성합니다.
      isLoading,
      getListByPageNumber,
      getNextPageList,
      issueList,
      getIssueDetail,
      issueDetail,
      pageNum,
      headerTitle,
      setHeader,
      isNoMore,
      isError,
    };
  
    return (<AssignmentContext.Provider value={value}>
        {children}
      </AssignmentContext.Provider>
    );
  };
  
  export default ContextProvider;