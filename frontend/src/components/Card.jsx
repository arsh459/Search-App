import React from "react"

export default function Card({ data }) {
  const { headline, description, imageUrl, primaryText, companies } = data

  //converting googleDrive link to compatible form
  function convertImageUrl(imageUrl) {
    const type = imageUrl.split("/")[3]
    let fileId
    if (type === "file") {
      fileId = imageUrl.split("/")[5].split("?")[0]
    } else {
      fileId = imageUrl.split("/")[3].split("?")[1].split("&")[0].split("=")[1]
    }

    const newUrl = `https://drive.google.com/uc?id=${fileId}`
    return newUrl
  }

  return (
    <div className="card_wrap">
      <div className="image">
        <img src={convertImageUrl(imageUrl)} alt={companies.name} />
      </div>
      <p>
        <span>Headline:- </span>
        {headline}
      </p>
      <p>
        <span>Description:- </span>
        {description}
      </p>
      <p>
        <span>Primary Text:- </span>
        {primaryText}
      </p>
      <p>
        <span>Company Name:- </span>
        {companies.name}
      </p>

      <span>
        Company Url:-{" "}
        <a href={companies.url} target="_blank">
          {companies.url}
        </a>{" "}
      </span>
    </div>
  )
}
