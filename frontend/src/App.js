import "antd/dist/antd.css"

import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { Col, Row, Timeline } from "antd"
import { useEffect, useState } from "react"

function App() {
    const [tasks, setTasks] = useState([])
    const [timeline, setTimeline] = useState([])

    useEffect(() => {
        const fetchAllTasks = async () => {
            const response = await fetch("/task/")
            const fetchedTasks = await response.json()
            setTasks(fetchedTasks)
        }

        const interval = setInterval(fetchAllTasks, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        const timelineItems = tasks.reverse().map((task) => {
            return task.completed ? (
                <Timeline.Item
                    dot={<CheckCircleOutlined />}
                    color="green"
                    style={{ textDecoration: "line-through", color: "green" }}
                >
                    {task.name} <small>({task._id})</small>
                </Timeline.Item>
            ) : (
                <Timeline.Item
                    dot={<MinusCircleOutlined />}
                    color="blue"
                    style={{ textDecoration: "initial" }}
                >
                    {task.name} <small>({task._id})</small>
                </Timeline.Item>
            )
        })

        setTimeline(timelineItems)
    }, [tasks])

    return (
        <>
            <Row style={{ marginTop: 50 }}>
                <Col span={14} offset={5}>
                    <Timeline mode="alternate">{timeline}</Timeline>
                </Col>
            </Row>
        </>
    )
}

export default App
