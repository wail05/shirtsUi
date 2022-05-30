import "antd/dist/antd.css";
import React, { useEffect } from "react";
import axios from "axios";
import { Col, Button } from "antd";
import { CardComponent } from "../CardComponent/CardComponent";
import { CheckoutCart } from "../CheckoutCart/CheckoutCart";


export function CardComponentList(props) {
    const [post, setPost] = React.useState([]);

    useEffect(() => {
        axios("http://localhost:8080/component/getAllShirts")
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSetPost = (posts) => {
        console.log("post from CardComponentList: ", post);
        setPost(posts);
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
                {post &&
                    post.map((component, i) => {
                        return <CardComponent
                            component={component}
                            key={i}
                            handleSetPost={handleSetPost}
                            post={post}
                        />
                    })
                }
            </Col>
            <Col style={{ marginRight: "5px" }} span={4}>
                <div style={{ position: "fixed" }}>
                    <CheckoutCart /*data={toBePurchased}*/ />
                    <div style={{ display: "flow-root", position: "relative" }}>
                        <Button
                            type="primary"
                            style={{ borderRadius: "8px", width: "100%" }}
                            onClick={() => { props.handleSubmit(post) }}
                        >
                            Check Out
                        </Button>
                        <Button
                            type="danger"
                            style={{ borderRadius: "8px", width: "100%" }}
                            onClick={() => { }}
                        >
                            Cancel
                        </Button>
                    </div>

                </div>
            </Col>
        </div>
    )
}