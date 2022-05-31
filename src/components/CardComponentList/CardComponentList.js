import "antd/dist/antd.css";
import React, { useEffect } from "react";
import axios from "axios";
import { Col, Button, notification } from "antd";
import { CardComponent } from "../CardComponent/CardComponent";
import { CheckoutCart } from "../CheckoutCart/CheckoutCart";


export function CardComponentList() {
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

    const handleSubmit = async (posts) => {
        if (posts.length === 0) {
            fetchShirts()
            return notification.error({
                message: "Error",
                description: "Your Cart is empty!"
            })
        }
        axios.put("http://localhost:8080/component/updateShirtAvailability", posts)
            .then(() => fetchShirts())
            .catch(error => {
                notification.error({
                    message: "error",
                    description: `${error.response.data.message}`
                });
                fetchShirts();
            })
    }



    useEffect(() => {
        fetchShirts();
    }, [post.length])

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
        handleSubmit(data)
    }

    const handleCancel = () => {
        setCart([])
        setPost([]);
    }
    const handleUpdateShirt = (idx, newShirtState) => {
        const newShirt = [...post];
        newShirt[idx] = newShirtState;
        setPost(newShirt)
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
                    post && post.map((shirt, i) => {
                        return <CardComponent
                            handleUpdateShirt={handleUpdateShirt}
                            shirt={shirt}
                            index={i}
                            key={i}
                            handleSetPost={handleSetPost}
                            post={post}
                            updateCart={updateCart}
                        />
                    })
                }
            </Col>
            <Col style={{ marginRight: "-5px" }} span={4}>
                <div style={{ position: "fixed" }}>
                    <CheckoutCart /*data={toBePurchased}*/ cart={cart} />
                    <div style={{ display: "flow-root", position: "relative" }}>
                        <Button
                            type="primary"
                            style={{ borderRadius: "8px", width: "100%" }}
                            onClick={() => handleCheckout(cart)}

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