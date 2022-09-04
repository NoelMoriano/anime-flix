import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { faFilter, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CardAnime, Select } from "../../components";
import { useAnimes } from "../../providers";
import { useNavigate } from "react-router";
import { capitalize, includes, orderBy } from "lodash";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const SearchResult = () => {
  const navigate = useNavigate();
  const { animes } = useAnimes();

  const [animesData, setAnimesData] = useState([]);
  const [category, setCategory] = useState("all");
  const [animeState, setAnimeState] = useState("all");
  const [gender, setGender] = useState("all");

  const onNavigateTo = (param) => navigate(param);

  useEffect(() => {
    filterAnimes();
  }, [category, gender, animeState]);

  const filterAnimes = () => {
    const filterAnime = animes
      .filter((anime) =>
        category === "all" ? true : anime.category === category
      )
      .filter((anime) =>
        gender === "all" ? true : includes(anime.gender, gender)
      )
      .filter((anime) =>
        animeState === "all" ? true : includes(anime.state, animeState)
      );

    setAnimesData(orderAnimes(filterAnime));
  };

  const orderAnimes = (animes) =>
    orderBy(animes, (anime) => capitalize(anime.name), ["asc"]);

  return (
    <Container>
      <h1>
        <FontAwesomeIcon icon={faList} className="item-icon" />
        Lista de Animes
      </h1>
      <div className="section-select">
        <Select
          title="Genero: Todos"
          onFilterAnimes={setGender}
          options={[
            { label: "Shounen", value: "shounen" },
            { label: "Comedia", value: "comedia" },
          ]}
        />
        <Select
          title="Categoria: Todos"
          onFilterAnimes={setCategory}
          options={[
            { label: "Anime", value: "anime" },
            { label: "Ova", value: "ova" },
          ]}
        />
        <Select
          title="Estado: Todos"
          onFilterAnimes={setAnimeState}
          options={[
            { label: "Finalizado", value: "finalizado" },
            { label: "Emisión", value: "emision" },
          ]}
        />
        {/*<Select*/}
        {/*  title="Año: Todos"*/}
        {/*  onFilterAnimes={setCategory}*/}
        {/*  options={[*/}
        {/*    { label: "Anime", value: "anime" },*/}
        {/*    { label: "Ova", value: "ova" },*/}
        {/*  ]}*/}
        {/*/>*/}
        {/*<Button type="primary" size="small" borderRadius=".5em">*/}
        {/*  <FontAwesomeIcon icon={faFilter} className="item-icon" />*/}
        {/*  Filtrar*/}
        {/*</Button>*/}
      </div>
      <div className="section-anime">
        {animesData.map((anime, index) => (
          <CardAnime
            key={index}
            onNavigateAnime={() => onNavigateTo(`/anime/${anime.id}`)}
            title={anime.name}
            image={anime.animePicture.url}
            synopsis={anime.synopsis}
          />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.main`
  ${({ theme }) => css`
    color: ${theme.colors.font2};
    padding: ${theme.paddings.x_large};
    h1 {
      font-size: ${theme.font_sizes.xx_large};
      text-transform: uppercase;
      font-weight: bold;
      .item-icon {
        padding-right: ${theme.paddings.x_small};
      }
    }
    .section-select {
      padding: 2rem 0;
      display: flex;
      grid-column-gap: 1em;
      flex-wrap: wrap;
      align-items: center;
    }
    .section-anime {
      display: grid;
      text-align: left;
      justify-content: center;
      margin: auto;
      gap: 2em;
      grid-template-columns: repeat(auto-fit, minmax(9em, auto));
      ${mediaQuery.minTablet} {
        justify-content: start;
      }
    }
  `}
`;