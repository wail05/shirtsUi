import "antd/dist/antd.min.css";
import React from "react";
import { Card, Button } from "antd"

const { Meta } = Card;
export function CardComponent(props) {
    const {
        id,
        name,
        available,
        description,
        img
    } = props.component;

    const [availableShirts, setAvailableShirts] = React.useState(available);
    const [shirtsToBuy, setShirtsToBuy] = React.useState(0);
    const [toBePurchased, setToBePurchased] = React.useState(props.data);
    const [newPost] = React.useState(props.post)

    const addToCart = () => {
        if (availableShirts > 0) {
            setAvailableShirts(availableShirts - 1);
            setShirtsToBuy(shirtsToBuy + 1);
        }
    }

    const toBeMapped = {
        available: availableShirts,
        quantity: shirtsToBuy,
        id
    }

    console.log("to be mapped : ", toBeMapped);

    const updateCart = (obj) => {
        const newArr = toBePurchased?.map(ele => {
            if (ele.id === obj.id) {
                console.log("before: ", ele.quantity);
                ele.quantity = obj.quantity;
                console.log("after: ", ele.quantity)
            }
        })
        return newArr;
    }

    const updateNewPost = (obj) => {
        const newArr = newPost?.map(ele => {
            if (ele.id === obj.id) {
                ele.available = obj.available;
            }
        })
        return newArr;
    }

    updateNewPost(toBeMapped);
    updateCart(toBeMapped)
    props.handleSetPost(newPost);

    return (
        <Card
            hoverable
            style={{ width: 240, marginTop: "20px", marginRight: "25px" }}
            cover={
                <img
                    alt="example"
                    src={img}
                />
            }
        >
            {props.children}
            <Meta title={name} description={description} />
            {availableShirts !== 0 ? <h1>Available {availableShirts}</h1> : <h1 style={{ color: "red" }}>Sold Out</h1>}
            <Button disabled={availableShirts === 0} onClick={() => addToCart()}>Add to cart</Button>
        </Card>
    )
}