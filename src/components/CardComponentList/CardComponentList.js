import "antd/dist/antd.css";
import React, { useEffect } from "react";
import axios from "axios";
import { Col, Button } from "antd";
import { CardComponent } from "../CardComponent/CardComponent";
import { CheckoutCart } from "../CheckoutCart/CheckoutCart";


export function CardComponentList(props) {
    const [post, setPost] = React.useState([]);
    const [cart, setCart] = React.useState([])


    const fetchShirts = () => {
        axios("http://localhost:8080/component/getAllShirts")
            .then(res => {
                console.log(res.data, "<===api called")
                setPost(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        fetchShirts();

    }, [])

    const handleSetPost = (posts) => {
        // console.log("post from CardComponentList: ", post);
        setPost(posts);
    }



    const updateCart = (cartItem) => {
        const cartExist = cart.find(x => x.id == cartItem.id)

        const data = {
            id: cartItem.id,
            quantity: cartItem.quantity + 1,
            available: cartItem.available,
            name: cartItem.name,

        }

        if (cartExist) {
            const newData = {
                id: cartItem.id,
                quantity: cartExist.quantity + 1,
                available: cartItem.available,
                name: cartItem.name,

            }
            const updatedCart = cart.map(x => x.id === cartItem.id ? newData : x)
            console.log("cart exists")
            setCart(updatedCart)
        } else {
            setCart((oldArr) => [...oldArr, data])
        }

        console.log(cartItem, '<===cart item')
    }

    console.log(cart, "<== my cart")


    const handleCheckout = (data) => {
        setCart([])
        props.handleSubmit(data)
    }
    const handleCancel = () => {
        setCart([])
        fetchShirts()
    }



    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "25px",
                marginLeft: "100px"
            }}
        >
            <Col span={18} style={{ display: "flex" }}>
                {
                    post && post.map((component, i) => {
                        return <CardComponent
                            component={component}
                            key={i}
                            handleSetPost={handleSetPost}
                            post={post}
                            updateCart={updateCart}
                        />
                    })
                }
            </Col>
            <Col style={{ marginRight: "5px" }} span={4}>
                <div style={{ position: "fixed" }}>
                    <CheckoutCart /*data={toBePurchased}*/ cart={cart} />
                    <div style={{ display: "flow-root", position: "relative" }}>
                        <Button
                            type="primary"
                            style={{ borderRadius: "8px", width: "100%" }}
                            onClick={() => handleCheckout(post)}
                        >
                            Check Out
                        </Button>
                        <Button
                            type="danger"
                            style={{ borderRadius: "8px", width: "100%" }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>

                </div>
            </Col>
        </div>
    )
}