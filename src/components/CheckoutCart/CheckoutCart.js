import React, { useEffect } from "react";
import { Form } from "antd";

export function CheckoutCart({ cart }) {
    return (
        <div
            style={{
                display: "grid",
                gap: "1rem",
                gridTemplateRows: "repeat(1,350px)",
                padding: ".5rem"
            }}
        >
            <div
                style={{
                    // display:"block",
                    // width: "435px",
                    boxShadow: "0 1px 6px",
                    display: "flex",
                    flexDirection: "row",
                    padding: ".5rem",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    flexWrap: "wrap"
                }}
            >
                <div style={{ width: "100%", display: "flex" }}>
                    {cart?.map(ele => {
                        if (ele.quantity !== 0) {
                            return (
                                <Form.Item
                                    label={ele.name}
                                    name={ele.name}
                                    style={{ color: "blue" }}
                                >
                                    {ele.quantity}
                                </Form.Item>
                            )
                        }
                    })}
                </div>

            </div>
        </div>
    )
}