import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useParams, useNavigate } from "react-router-dom";
import HeaderDesign from "../HeaderDesign";
import FooterDesign from "../FooterDesign";
import { UpBtn } from "./ReusableComponents";

const Container = styled.div`
  // 전체 영역을 설정 flexbox로 배치할 때 기준이 필요할 것이라 생각했기 때문
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const StatusBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-self: center;
  padding-left: 32px;
  margin: 16px 0 16px 0;
  width: 98%;
  height: 80px;
  background: rgb(193, 159, 138);
  /* border: 0.5px solid rgb(223, 214, 210); */
  color: white;
  border-radius: 5px;
`;
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;
const RecmdCard = styled.button`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 360px;
  padding: 0;
  margin: 30px 0 30px;
  align-self: space-evenly;
  /* background: rgb(193, 159, 138); */
  background: white;
  border: 0.5px solid rgb(193, 159, 138);
  /* border: none; */
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
  }
`;
const CardImg = styled.img`
  width: 200px;
  height: 200px;
  border: none;
  outline: none;
  margin-top: 10px;
  border-radius: 10px;
  align-self: center;
`;
const CardTitle = styled.div`
  margin-left: 16px;
`;
const CardDesc = styled.div`
  font-size: 0.9em;
  width: 90%;
  height: 35px;
  align-self: center;
  padding-top: 8px;
  border-top: 0.5px solid rgb(193, 159, 138);
  color: #495057;
`;
const CardTag = styled.div`
  width: 90%;
  color: #495057;
  font-size: 0.9em;
  align-self: center;
`;
const FalseResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;
const DownBlanc = styled.div`
  display: flex;
  width: 100%;
  align-self: flex-end;
  height: 160px;
  justify-content: center;
  align-items: center;
`;
const ProductSearch = () => {
  const navigate = useNavigate();
  const { sword } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);

  useEffect(() => {
    const search = async () => {
      try {
        const rsp = await AxiosApi.searchResultGet(sword);
        setSearchResult(rsp);
        console.log(rsp);
        if (rsp.length === 0) {
          setIsSearchResult(false);
        } else if (rsp.length > 0) {
          setIsSearchResult(true);
        }
      } catch (error) {
        console.error("검색결과 받아오기 실패!!", error);
      }
    };
    search();
  }, [sword]);

  const cardClick = (product_no) => {
    navigate(`/Product/${product_no}`);
  };
  return (
    <Container>
      <HeaderDesign />
      <BodyContainer>
        {isSearchResult ? (
          <>
            <StatusBox>
              <p>{searchResult.length} 개의 검색 결과가 있습니다.</p>
            </StatusBox>
            <CardContainer>
              {searchResult.map((e) => (
                <RecmdCard
                  key={e.product_name}
                  onClick={() => cardClick(e.product_no)}
                >
                  <CardImg src={e.product_img} />
                  <CardTitle>
                    <h4>{e.product_name}</h4>
                  </CardTitle>
                  <CardDesc>{e.content1}</CardDesc>
                  <CardTag>{e.content2}</CardTag>
                </RecmdCard>
              ))}
            </CardContainer>
          </>
        ) : (
          <>
            <StatusBox>
              <p>{searchResult.length} 개의 검색 결과가 있습니다.</p>
            </StatusBox>
            <FalseResult>
              <span>검색 결과가 존재하지 않습니다.</span>
            </FalseResult>
          </>
        )}
        <DownBlanc>
          <UpBtn />
        </DownBlanc>
      </BodyContainer>
      <FooterDesign />
    </Container>
  );
};
export default ProductSearch;
