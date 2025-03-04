import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import React, { useState, useEffect } from "react";



const CardList = ({data}) => {

const limit = 10;
const defaultDataset = data.slice(0, limit);
const [offset, setOffset] = useState(0);
const [products, setProducts] = useState(defaultDataset);
const handlePrevious = () => {
  setOffset(offset - 10);
}
const handleNext = () => {
  setOffset(offset + 10);
}
useEffect(() => {
  setProducts(data.slice(offset, offset + limit));
}, [offset, limit, data]);

const filterTags = (tagQuery) =>{
  const filtered = data.filter(product =>{
    if(!tagQuery){
      return product
    }

    return product.tags.find(({title})=> title === tagQuery)
  })

  setOffset(0)
  setProducts(filtered.slice(0,limit))

}

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
        // Using the data prop, we map over the list of products and render a Card component for each product
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      //  Pagination Buttons
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" handleClick={() => setOffset(offset - 10)}/>
        <Button text="Next" handleClick={() => setOffset(offset + 10)} />
      </div>
    </div>
  )
}

export default CardList;