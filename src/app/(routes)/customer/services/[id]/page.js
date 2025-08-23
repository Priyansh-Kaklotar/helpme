"use client"
import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const page = () => {
    const params = useParams();
    const id = params.id;

    const [Service, setService] = useState(null);

    useEffect(() => {

        async function Get_Service() {
            try {
                const res = await axios.get(`/api/services/${id}`)
                const data = res.data;
                console.log(data);
                setService(data);
            } catch (error) {
                console.log(error);
            }
        }
        Get_Service();
    }, [])

    return (
        <div>
            This is dedicated page for each service
        </div>
    )
}

export default page
