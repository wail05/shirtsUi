import "antd/dist/antd.min.css";
import React from "react";
import { Card, Button } from "antd"

const { Meta } = Card;
export function CardComponent({ shirt, post, handleSetPost, children, updateCart, handleUpdateShirt, index }) {
    const {
        id,
        name,
        available,
        description,
        img
    } = shirt;

    // const [available, setAvailableShirts] = React.useState(available);
    const [shirtsToBuy, setShirtsToBuy] = React.useState(0);
    // const [toBePurchased, setToBePurchased] = React.useState(data);
    const [newPost] = React.useState(post)

    const addToCart = () => {
        const newShirtState = { ...shirt, available: available - 1 }
        if (available > 0) {
            handleUpdateShirt(index, newShirtState)
        }
    }

    const toBeMapped = {
        name,
        available: available,
        quantity: shirtsToBuy,
        id
    }

    // console.log("to be mapped : ", toBeMapped);


    const updateNewPost = (obj) => {
        const newArr = newPost?.map(ele => {
            if (ele.id === obj.id) {
                ele.available = obj.available;
            }
        })
        return newArr;
    }

    updateNewPost(toBeMapped);
    // updateCart(toBeMapped)
    handleSetPost(newPost);

    return (
        <Card
            hoverable
            style={{ width: 220, marginTop: "20px", marginRight: "25px" }}
            cover={
                <img
                    alt="example"
                    src={img}
                />
            }
        >
            {children}
            <Meta title={name} description={description} />
            {available !== 0 ? <h1>Available {available}</h1> : <h1 style={{ color: "red" }}>Sold Out</h1>}
            <Button disabled={available === 0} onClick={() => { updateCart(toBeMapped); addToCart() }}>Add to cart</Button>
        </Card>
    )
}