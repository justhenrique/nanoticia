import React, { useEffect, useState } from "react";
import Image from "next/image";

import { ThumbNewsProps } from "./interface";
import { icons } from "./components/Icons";
import { categories } from "./components/Categories";

import DefaultThumnail from "../../assets/default-thumnail.svg";

import { Container } from "./styles";

const ThumbNews = ({
  title,
  description,
  url,
  image,
  publishedAt,
  source,
  design,
}: ThumbNewsProps) => {
  var date = new Date(publishedAt);
  const formatDate = date.toLocaleTimeString("pt-BR", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    if (image) setHasImage(true);
  }, [image]);

  return (
    <Container
      hasImage={hasImage}
      design={design}
      onClick={() => window.open(url, "_blank")}
    >
      <div className="thumb-image">
        {image && hasImage ? (
          <img onError={() => setHasImage(false)} src={image} alt="fill" />
        ) : (
          <Image src={DefaultThumnail} alt="fill"></Image>
        )}
      </div>
      <div className="info">
        {design === "highlight" && (
          <>
            <h4>{source.name}</h4>
            <h2>{title}</h2>
            <p className="description">
              {description
                .replace(/&#8220;/i, "'")
                .replace(/&#8221;/i, "'")
                .replace(/&#8211;/i, "'")
                .replace(/&#8216;/i, "'")}
            </p>
            <p className="publishedAt">{formatDate} </p>
          </>
        )}
        {design === "vertical" && (
          <>
            <div>
              <p className="publishedAt">{formatDate} </p>
              <h4>{title}</h4>
              <p>{source.name}</p>
            </div>
          </>
        )}
        {design === "horizontal" && (
          <>
            <div className="info-content">
              <p className="publishedAt">{formatDate} </p>
              <h4>{title}</h4>
              <p>{source.name}</p>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default ThumbNews;
