import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import '../App.css';
import apiService from '../services/apiServices';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const styles = {
    section: {
        fontSize: "100%",
        color: "#292b2c",
        padding: "20px"
    },
}

const Admin = () => {

    const [data, setData] = useState([]);
    const is_user = localStorage.getItem('role');
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('admin/users');
                setData(response.data);

            } catch (error) {
                console.error("error Fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const getdata = async () => {
        try {
            const response = await apiService.get('admin/users');
            setData(response.data);

        } catch (error) {
            console.error("error Fetching data: ", error);
        }
    }



    const updateUserToModerator = async (id) => {
        try {
            const response = await apiService.put(`admin/updateRoleToMOD/${id}`);
            console.log(response.data);
            getdata();
            
        } catch (error) {
            console.error("Error while Updating Role: ", error);
        }
    }

    const updateUserToUser = async (id) => {
        try {
            const response = await apiService.put(`admin/updateRoleToUser/${id}`);
            console.log(response.data);
            getdata();
        } catch (error) {
            console.error("Error while Updating Role: ", error);
        }
    }

    return (
        <div style={styles.section}>

            {
                is_user === "ADMIN" ?
                    <>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && Array.isArray(data) ** data.length > 0 ?
                                    data.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    {
                                                        item.role === "USER" ? <> <Button className="btn-light" onClick={() => updateUserToModerator(item.id)}> </Button> </> : ""
                                                    }
                                                    {
                                                        item.role === "MODERATOR" ? <> <Button onClick={() => updateUserToUser(item.id)}> </Button> </> : ""
                                                    }
                                                </td>
                                            </tr>
                                    ))
                                        : ""
                                }

                            </tbody>
                        </Table>
                    </> :
                    <>
                       { navigate("/api/auth/signin")}
                    </>
                    
            }
        </div >
    );
};
export default Admin